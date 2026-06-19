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

// In-memory fallback store
const memoryStore = []

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

    // Define schema & model
    const enquirySchema = new mongoose.Schema(
      {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, required: true, trim: true },
        discountCode: { type: String, trim: true },
        createdAt: { type: Date, default: Date.now },
      },
      { collection: 'Registered' }
    )

    // Avoid re-registering model on hot reload
    EnquiryModel =
      mongoose.models?.Registered ?? mongoose.model('Registered', enquirySchema)
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    console.warn('   Falling back to in-memory store.')
    mongoose = null
    EnquiryModel = null
  }
}

/**
 * Save an enquiry document.
 * Uses MongoDB when connected; falls back to the in-memory store.
 *
 * @param {object} data  – { name, email, phone, createdAt }
 * @returns {Promise<object>}  – saved document
 */
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

/** Retrieve all in-memory enquiries (useful for testing) */
export function getMemoryStore() {
  return [...memoryStore]
}
