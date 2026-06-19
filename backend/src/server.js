import cors from 'cors'
import express from 'express'
import {
  connectDB,
  saveEnquiry,
  registerUser,
  authenticateUser,
  createSession,
  getSessionUser,
  deleteSession,
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

/** Authentication middleware */
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.',
    })
  }

  const token = authHeader.split(' ')[1]
  try {
    const user = await getSessionUser(token)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session. Please log in again.',
      })
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    })
  }
}

/* ─────────────── Health Check ─────────────── */
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() })
})

/* ─────────────── Authentication Endpoints ─────────────── */

/** User Signup */
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body ?? {}

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are all required.',
      })
    }

    if (username.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters.',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      })
    }

    const user = await registerUser({ username, email, password })
    const token = await createSession(user.id)

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user,
    })
  } catch (error) {
    console.error('[POST /api/auth/signup] Error:', error.message)
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

/** User Login */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {}

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      })
    }

    const user = await authenticateUser({ email, password })
    const token = await createSession(user.id)

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user,
    })
  } catch (error) {
    console.error('[POST /api/auth/login] Error:', error.message)
    return res.status(401).json({
      success: false,
      message: error.message,
    })
  }
})

/** Get Current Authenticated User */
app.get('/api/auth/me', requireAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  })
})

/** User Logout */
app.post('/api/auth/logout', requireAuth, async (req, res) => {
  try {
    await deleteSession(req.token)
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    })
  } catch (error) {
    console.error('[POST /api/auth/logout] Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to log out.',
    })
  }
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
