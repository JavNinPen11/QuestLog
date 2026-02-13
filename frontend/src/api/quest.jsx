const API_URL = import.meta.env.VITE_BACKEND_URL

export async function getQuests() {
    const res = await fetch(`${API_URL}/quests/`, {
        credentials: "include"
    })
    return res.json()
}
export async function createQuest(data) {
    const res = await fetch(`${API_URL}/quests/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: data,
        credentials: "include"
    })
    
    return res.json()
}