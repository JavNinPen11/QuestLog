import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import styles from "./LoginForm.module.scss"
import { useAuth } from '../context/userContext'
import { getMe, login } from '../api/auth'

export const LoginForm = () => {
    const {setUser} = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await login(username, password)
        setLoading(true)
        if(res.error) setError(res.error)
        else{
            const me = await getMe()
            if(me){
                setUser(me)
                navigate("/")
                setLoading(false)
            }
            else{
                setError("Error al obtener los datos del usuario")
                setLoading(false)
            }
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <input placeholder='Usuario' value={username} onChange={e => setUsername(e.target.value)}/>
        <input  type='password' placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)}/>
        <button type='submit'>Login</button>
        {error && <p>{error}</p>}
        {(loading && !error) && <p>Cargando...</p>}
    </form>
  )
}
export default LoginForm
