const SYSTEM_PROMPT = `You are an AI assistant for Mohamed Ibrahim, known as YapoeY.
Answer questions about him in a fun, friendly, and professional tone.

About YapoeY:
- Full Stack Developer based in Seoul, South Korea
- Originally from Egypt
- Studied Computer Science at Hanyang University, Korean language at Kyung Hee University
- Accounting degree from Ain Shams University (Egypt)
- Has worked at: GeeksFamily, Himedi, b2ggames, and freelance projects
- Skills: Vue.js, Nuxt.js, PHP/Laravel, MySQL, AWS, Docker, Node.js
- Speaks Arabic (native), English (fluent), Korean (conversational)
- Has a YouTube channel teaching web dev in Arabic
- Has visited 32 countries
- Personal site: yapoey.com
- Contact: yapoey@gmail.com

Keep answers under 3 sentences unless it's a technical question.
If asked something completely unrelated to YapoeY, politely redirect.
Add a touch of humor where appropriate.
Never make up information you don't have — say "I'm not sure about that" instead.`

// --- Rate Limiting ---
// Per-IP: 10 requests per 5 minutes
// Global: 100 requests per hour
const RATE_LIMIT_PER_IP = 10
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const GLOBAL_LIMIT = 100
const GLOBAL_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const ipRequests = new Map() // ip -> { count, resetAt }
let globalCount = 0
let globalResetAt = Date.now() + GLOBAL_WINDOW_MS

function checkRateLimit(ip) {
  const now = Date.now()

  // Global limit
  if (now > globalResetAt) {
    globalCount = 0
    globalResetAt = now + GLOBAL_WINDOW_MS
  }
  if (globalCount >= GLOBAL_LIMIT) {
    return { limited: true, message: 'AI is taking a break. Too many requests globally. Try again later.' }
  }

  // Per-IP limit
  const entry = ipRequests.get(ip)
  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  } else {
    if (entry.count >= RATE_LIMIT_PER_IP) {
      const waitSec = Math.ceil((entry.resetAt - now) / 1000)
      return { limited: true, message: `Slow down! You've used ${RATE_LIMIT_PER_IP} AI requests. Try again in ${waitSec}s.` }
    }
    entry.count++
  }

  globalCount++
  return { limited: false }
}

// Clean up old IP entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of ipRequests) {
    if (now > entry.resetAt) ipRequests.delete(ip)
  }
}, 10 * 60 * 1000)

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY || process.env.NUXT_GEMINI_API_KEY

  if (!apiKey) {
    throw createError({
      statusCode: 503,
      message: 'Gemini API key not configured',
    })
  }

  // Get client IP
  const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    || getRequestHeader(event, 'x-real-ip')
    || event.node.req.socket?.remoteAddress
    || 'unknown'

  // Check rate limit (skip in development)
  if (process.env.NODE_ENV === 'production') {
    const limit = checkRateLimit(ip)
    if (limit.limited) {
      return { answer: limit.message }
    }
  }

  const body = await readBody(event)
  const question = body?.question

  if (!question || typeof question !== 'string') {
    throw createError({
      statusCode: 400,
      message: 'Question is required',
    })
  }

  // Cap question length (allow longer for internal AI commands)
  const safeQuestion = question.slice(0, 3000)

  try {
    const response = await $fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        body: {
          contents: [
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_PROMPT}\n\nUser question: ${safeQuestion}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.7,
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        },
      }
    )

    const parts = response?.candidates?.[0]?.content?.parts || []
    const answer = parts
      .filter(p => p.text)
      .map(p => p.text)
      .join('\n') || "Sorry, I couldn't generate a response."

    return { answer }
  } catch (err) {
    console.error('[Gemini] Error:', err?.data || err?.message || err)
    throw createError({
      statusCode: 502,
      message: err?.data?.error?.message || 'Failed to reach Gemini API',
    })
  }
})
