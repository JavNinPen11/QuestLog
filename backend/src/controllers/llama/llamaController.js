const EMBED_URL = process.env.EMBED_URL
const EMBED_MODEL = process.env.EMBED_MODEL
const LLM_URL = process.env.LLM_URL
const LLM_MODEL = process.env.LLM_MODEL

export async function generateEmbedding(text) {
    const res = await fetch(`${EMBED_URL}/api/embeddings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: EMBED_MODEL,
          prompt: text})
    })
    const data = await res.json()
    return data.embedding
}
export function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dot / (magA * magB)
}
export async function callLLM(prompt) {
  try {
    const res = await fetch(`${LLM_URL}/api/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: LLM_MODEL, prompt, max_tokens: 200 })
    })
    const data = await res.json()
    return data.text
  } catch (err) {
    console.error("LLM no disponible:", err.message)
    return null
  }
}