import cors from 'cors'
import express from 'express'
import {
  connectDB,
  saveEnquiry,
  subscribeNewsletter,
} from './db.js'

const app = express()
const PORT = Number(process.env.PORT) || 5000

/* ─────────────── Middleware ─────────────── */
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  })
)
app.use(express.json())

/* ─────────────── Health Check ─────────────── */
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() })
})

/* ─────────────── POST /api/enquiry ─────────────── */
app.post('/api/enquiry', async (req, res) => {
  try {
    const { name, email, phone, discountCode } = req.body ?? {}

    /* ── Field presence check ── */
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are all required.',
      })
    }

    const trimmedName = String(name).trim()
    const trimmedEmail = String(email).trim().toLowerCase()
    const trimmedPhone = String(phone).trim()

    /* ── Name validation ── */
    if (trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters.',
      })
    }

    /* ── Email validation ── */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      })
    }

    /* ── Phone validation ── */
    if (!/^(\+\d{1,4})?\d{8,11}$/.test(trimmedPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number (e.g. +91 9876543210 or 8-11 digit number).',
      })
    }

    /* ── Persist to MongoDB ── */
    const enquiryData = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      discountCode: discountCode ? String(discountCode).trim().toUpperCase() : undefined,
      createdAt: new Date(),
    }

    await saveEnquiry(enquiryData)

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully! We'll get back to you within 24 hours.",
      data: enquiryData,
    })
  } catch (error) {
    console.error('[POST /api/enquiry] Unexpected error:', error)
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred. Please try again later.',
    })
  }
})

/* ─────────────── POST /api/newsletter/subscribe ─────────────── */
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name, city, childrenAge } = req.body ?? {}

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email and name are required.',
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      })
    }

    const sub = await subscribeNewsletter({ email, name, city, childrenAge })

    return res.status(201).json({
      success: true,
      message: 'Awesome! You have been successfully subscribed to our newsletter.',
      data: sub,
    })
  } catch (error) {
    console.error('[POST /api/newsletter/subscribe] Error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.',
    })
  }
})

/* ─────────────── Start Server ─────────────── */
async function start() {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`\n🚀 Workshop backend running at http://localhost:${PORT}`)
    console.log(`   Health: http://localhost:${PORT}/api/health\n`)
  })
}

start()
