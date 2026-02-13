import { exec } from "child_process";
const EMBED_URL = process.env.EMBED_URL
const EMBED_MODEL = process.env.EMBED_MODEL
const LLM_URL = process.env.LLM_URL
const LLM_MODEL = process.env.LLM_MODEL
let stopTimer;

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
export async function generateQuestData(prompt) {
  const res = await fetch(`${LLM_URL}/api/generate`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      model: LLM_MODEL,
      prompt,
      stream: false
    })
  })
  return res.json()
}
export function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dot / (magA * magB)
}
export async function ensureLLM() {
  try {
    const res = await fetch("http://host.docker.internal:5000/ensure", {method: "POST"})
    if(!res.ok) throw new Error("Microservicio no respondio correctamente")

    const data = await res.json()

    if(data.running){
      console.log("LLM corriendo, lista para usar");
      return true;
    }else {
      console.log("LLM no está lista, fallback activado");
      return false;
    }
    
  } catch (err) {
    console.error("Error asegurando LLM:", err.message);
    return false; 
  }
}
