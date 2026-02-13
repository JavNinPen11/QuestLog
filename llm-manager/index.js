import express from "express";
import { exec } from "child_process";

const app = express();
const PORT = 5000; 
// const LLM_CONTAINER = "questlog-llm";
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; 
let inactivityTimer = null;
let isRunning = false;

function startLLM() {
  return new Promise((resolve, reject) => {
    if (isRunning) return resolve("LLM ya está corriendo");

    exec(`docker-compose --profile llm up -d llm`, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      isRunning = true;
      resetTimer();
      resolve(stdout || "LLM levantada");
    });
  });
}

function stopLLM() {
  return new Promise((resolve, reject) => {
    exec(`docker-compose --profile llm stop llm`, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      isRunning = false;
      resolve(stdout || "LLM detenida");
    });
  });
}

function resetTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(async () => {
    console.log("LLM inactiva, bajando contenedor...");
    try {
      await stopLLM();
    } catch (err) {
      console.log("Error al detener LLM:", err);
    }
  }, INACTIVITY_TIMEOUT);
}

app.post("/llm/ensure", async (req, res) => {
  try {
    const msg = await startLLM();
    res.json({ status: "ok", message: msg });
  } catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
});

app.post("/llm/stop", async (req, res) => {
  try {
    const msg = await stopLLM();
    res.json({ status: "ok", message: msg });
  } catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
});

app.get("/llm/status", (req, res) => {
  res.json({ running: isRunning });
});

app.listen(PORT, () => {
  console.log(`LLM Manager corriendo en puerto ${PORT}`);
});
