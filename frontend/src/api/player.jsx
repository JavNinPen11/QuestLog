import { getMe } from "./auth"

const API_URL = import.meta.env.VITE_BACKEND_URL

export async function getPlayer() {
    const me = await getMe()
    const id = me.id
    const res = await fetch(`${API_URL}/player/${id}`,{
        credentials: "include"
    })
    return res.json()
}