import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * db.js – MongoDB connection and enquiry model
 *
 * Uses mongoose when MONGODB_URI is set.
 * Falls back to an in-memory store so the server still runs
 * without a database configured.
 */

let mongoose = null
let EnquiryModel = null
let NewsletterModel = null

// In-memory fallback stores
const memoryStore = []
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
