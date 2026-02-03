const API_URL = import.meta.env.VITE_BACKEND_URL

export async function login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({username, password})
    })
    return res.json()
}
export async function getMe() {
    const res = await fetch(`${API_URL}/auth/me`, {
        credentials:"include"
    })
    if(!res.ok) return null
    return res.json()
}
export async function logout() {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    })
    return res.json()
}