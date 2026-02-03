import { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./LoginForm.css"
import { UserContext } from '../context/userContext'
import { login } from '../api/auth'

export const LoginForm = () => {
    const {setUser} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await login(username, password)
        if(res.error) setError(res.error)
        else{
            navigate("/")
            setUser(username)
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <input placeholder='Usuario' value={username} onChange={e => setUsername(e.target.value)}/>
        <input  type='password' placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)}/>
        <button type='submit'>Login</button>
        {error && <p>{error}</p>}
    </form>
  )
}
export default LoginForm
