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

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 503,
      message: 'Gemini API key not configured',
    })
  }

  const body = await readBody(event)
  const question = body?.question

  if (!question || typeof question !== 'string') {
    throw createError({
      statusCode: 400,
      message: 'Question is required',
    })
  }

  try {
    const response = await $fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        body: {
          contents: [
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_PROMPT}\n\nUser question: ${question}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          },
        },
      }
    )

    const answer = response?.candidates?.[0]?.content?.parts?.[0]?.text
      || "Sorry, I couldn't generate a response."

    return { answer }
  } catch (err) {
    throw createError({
      statusCode: 502,
      message: 'Failed to reach Gemini API',
    })
  }
})
