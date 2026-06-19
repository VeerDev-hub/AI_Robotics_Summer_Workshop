import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

/**
 * db.js – MongoDB connection and enquiry model
 *
 * Uses mongoose when MONGODB_URI is set.
 * Falls back to an in-memory store so the server still runs
 * without a database configured.
 */

let mongoose = null
let EnquiryModel = null
let UserModel = null
let SessionModel = null
let NewsletterModel = null

// In-memory fallback stores
const memoryStore = []
const userMemoryStore = []
const sessionMemoryStore = []
const newsletterMemoryStore = []

/**
 * Manually parse and load .env file if process.env.MONGODB_URI is not set.
 * This handles cases where the server is run directly with node src/server.js
 * without passing the --env-file flag.
 */
function loadEnv() {
  if (process.env.MONGODB_URI) return

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const possiblePaths = [
    path.join(process.cwd(), '.env'),
    path.join(process.cwd(), 'backend', '.env'),
    path.resolve(__dirname, '../.env'),
  ]

  for (const envPath of possiblePaths) {
    try {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8')
        content.split(/\r?\n/).forEach((line) => {
          const trimmed = line.trim()
          if (trimmed && !trimmed.startsWith('#')) {
            const index = trimmed.indexOf('=')
            if (index > 0) {
              const key = trimmed.substring(0, index).trim()
              let val = trimmed.substring(index + 1).trim()
              // Remove wrapping quotes if present
              if (
                (val.startsWith('"') && val.endsWith('"')) ||
                (val.startsWith("'") && val.endsWith("'"))
              ) {
                val = val.slice(1, -1)
              }
              if (!process.env[key]) {
                process.env[key] = val
              }
            }
          }
        })
        console.log(`ℹ  Loaded environment variables from: ${envPath}`)
        break
      }
    } catch (err) {
      // Fail silently
    }
  }
}

/**
 * Attempt to load mongoose and connect to MongoDB.
 * Silently continues without DB if the URI is missing or
 * the connection fails (keeps the API functional regardless).
 */
export async function connectDB() {
  loadEnv()
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.warn(
      '⚠  MONGODB_URI not set. Enquiries will be stored in memory only (lost on restart).\n' +
      '   Set MONGODB_URI in your .env file to enable persistence.'
    )
    return
  }

  try {
    // Dynamic import so the server doesn't crash if mongoose isn't installed
    const mod = await import('mongoose')
    mongoose = mod.default

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      dbName: 'InterestedUsers',
    })

    console.log('✅ MongoDB connected successfully to InterestedUsers database.')

    // Define Enquiry Schema & Model
    const enquirySchema = new mongoose.Schema(
      {
        name:         { type: String, required: true, trim: true },
        email:        { type: String, required: true, trim: true, lowercase: true },
        phone:        { type: String, required: true, trim: true },
        discountCode: { type: String, trim: true },
        createdAt:    { type: Date,   default: Date.now },
      },
      { collection: 'Registered' }
    )

    EnquiryModel = mongoose.models?.Registered ?? mongoose.model('Registered', enquirySchema)

    // Define User Schema & Model
    const userSchema = new mongoose.Schema(
      {
        username:  { type: String, required: true, unique: true, trim: true },
        email:     { type: String, required: true, unique: true, trim: true, lowercase: true },
        password:  { type: String, required: true },
        createdAt: { type: Date,   default: Date.now }
      },
      { collection: 'Users' }
    )

    UserModel = mongoose.models?.User ?? mongoose.model('User', userSchema)

    // Define Session Schema & Model
    const sessionSchema = new mongoose.Schema(
      {
        token:     { type: String, required: true, unique: true, index: true },
        userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date,   default: Date.now }
      },
      { collection: 'Sessions' }
    )

    SessionModel = mongoose.models?.Session ?? mongoose.model('Session', sessionSchema)

    // Define Newsletter Schema & Model
    const newsletterSchema = new mongoose.Schema(
      {
        email:       { type: String, required: true, unique: true, trim: true, lowercase: true },
        name:        { type: String, required: true, trim: true },
        city:        { type: String, trim: true },
        childrenAge: { type: String, trim: true },
        createdAt:   { type: Date,   default: Date.now }
      },
      { collection: 'NewsletterSubscribers' }
    )

    NewsletterModel = mongoose.models?.NewsletterSubscriber ?? mongoose.model('NewsletterSubscriber', newsletterSchema)

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message)
    console.warn('   Falling back to in-memory store.')
    mongoose = null
    EnquiryModel = null
    UserModel = null
    SessionModel = null
    NewsletterModel = null
  }
}

/* ─────────────── Enquiry Database Operations ─────────────── */

export async function saveEnquiry(data) {
  if (EnquiryModel) {
    const doc = new EnquiryModel(data)
    await doc.save()
    return doc.toObject()
  }

  // In-memory fallback
  const record = { ...data, _id: Date.now().toString() }
  memoryStore.push(record)
  console.log(`📝 [In-memory] Enquiry saved. Total: ${memoryStore.length}`)
  return record
}

export function getMemoryStore() {
  return [...memoryStore]
}

/* ─────────────── Authentication Utilities ─────────────── */

/** Hash password using PBKDF2 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

/** Verify password against stored hash */
export function verifyPassword(password, storedPassword) {
  if (!storedPassword || !storedPassword.includes(':')) return false
  const [salt, originalHash] = storedPassword.split(':')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return hash === originalHash
}

/* ─────────────── Authentication Database Operations ─────────────── */

/** Register a new user */
export async function registerUser({ username, email, password }) {
  const cleanEmail = email.trim().toLowerCase()
  const hashedPassword = hashPassword(password)

  if (UserModel) {
    const existingEmail = await UserModel.findOne({ email: cleanEmail })
    if (existingEmail) throw new Error('Email is already registered')

    const existingUsername = await UserModel.findOne({ username: username.trim() })
    if (existingUsername) throw new Error('Username is already taken')

    const user = new UserModel({
      username: username.trim(),
      email: cleanEmail,
      password: hashedPassword,
    })
    await user.save()
    return { id: user._id.toString(), username: user.username, email: user.email }
  }

  // In-memory fallback
  const existingEmail = userMemoryStore.find((u) => u.email === cleanEmail)
  if (existingEmail) throw new Error('Email is already registered')

  const existingUsername = userMemoryStore.find((u) => u.username === username.trim())
  if (existingUsername) throw new Error('Username is already taken')

  const user = {
    id: Date.now().toString(),
    username: username.trim(),
    email: cleanEmail,
    password: hashedPassword,
  }
  userMemoryStore.push(user)
  return { id: user.id, username: user.username, email: user.email }
}

/** Authenticate user credentials */
export async function authenticateUser({ email, password }) {
  const cleanEmail = email.trim().toLowerCase()

  if (UserModel) {
    const user = await UserModel.findOne({ email: cleanEmail })
    if (!user) throw new Error('Invalid email or password')

    const isValid = verifyPassword(password, user.password)
    if (!isValid) throw new Error('Invalid email or password')

    return { id: user._id.toString(), username: user.username, email: user.email }
  }

  // In-memory fallback
  const user = userMemoryStore.find((u) => u.email === cleanEmail)
  if (!user) throw new Error('Invalid email or password')

  const isValid = verifyPassword(password, user.password)
  if (!isValid) throw new Error('Invalid email or password')

  return { id: user.id, username: user.username, email: user.email }
}

/** Create session token */
export async function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex')

  if (SessionModel) {
    const session = new SessionModel({ token, userId })
    await session.save()
    return token
  }

  // In-memory fallback
  sessionMemoryStore.push({ token, userId, createdAt: new Date() })
  return token
}

/** Retrieve session user details */
export async function getSessionUser(token) {
  if (SessionModel) {
    const session = await SessionModel.findOne({ token }).populate('userId')
    if (!session || !session.userId) return null
    return {
      id: session.userId._id.toString(),
      username: session.userId.username,
      email: session.userId.email,
    }
  }

  // In-memory fallback
  const session = sessionMemoryStore.find((s) => s.token === token)
  if (!session) return null

  const user = userMemoryStore.find((u) => u.id === session.userId)
  if (!user) return null

  return { id: user.id, username: user.username, email: user.email }
}

/** Terminate a session */
export async function deleteSession(token) {
  if (SessionModel) {
    const result = await SessionModel.deleteOne({ token })
    return result.deletedCount > 0
  }

  // In-memory fallback
  const index = sessionMemoryStore.findIndex((s) => s.token === token)
  if (index !== -1) {
    sessionMemoryStore.splice(index, 1)
    return true
  }
  return false
}

/* ─────────────── Newsletter Database Operations ─────────────── */

/** Subscribe to the newsletter */
export async function subscribeNewsletter({ email, name, city, childrenAge }) {
  const cleanEmail = email.trim().toLowerCase()

  if (NewsletterModel) {
    const existing = await NewsletterModel.findOne({ email: cleanEmail })
    if (existing) {
      existing.name = name.trim()
      existing.city = city ? city.trim() : undefined
      existing.childrenAge = childrenAge ? childrenAge.trim() : undefined
      await existing.save()
      return existing.toObject()
    }

    const sub = new NewsletterModel({
      email: cleanEmail,
      name: name.trim(),
      city: city ? city.trim() : undefined,
      childrenAge: childrenAge ? childrenAge.trim() : undefined,
    })
    await sub.save()
    return sub.toObject()
  }

  // In-memory fallback
  const existingIndex = newsletterMemoryStore.findIndex((n) => n.email === cleanEmail)
  const record = {
    email: cleanEmail,
    name: name.trim(),
    city: city ? city.trim() : undefined,
    childrenAge: childrenAge ? childrenAge.trim() : undefined,
    createdAt: new Date(),
  }
  if (existingIndex !== -1) {
    newsletterMemoryStore[existingIndex] = record
  } else {
    newsletterMemoryStore.push(record)
  }
  return record
}
