const API_URL = import.meta.env.VITE_BACKEND_URL

export async function getQuests() {
    const res = await fetch(`${API_URL}/quests/`, {
        credentials: "include"
    })
    return res.json()
}