import React, { useState } from 'react'
import {register} from  "../api/auth"
import {useNavigate} from "react-router-dom"

export const RegisterForm = () => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await register(name, username, email, password)
        if(res.error) setError(res.error)
        else{
            navigate("/")
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <input placeholder='name'value={name} onChange={e => setName(e.target.value)}/>
        <input placeholder='username'value={username} onChange={e => setUsername(e.target.value)}/>
        <input placeholder='password'type='password' value={password} onChange={e => setPassword(e.target.value)}/>
        <input placeholder='email'value={email} onChange={e => setEmail(e.target.value)}/>
        <button type='submit'>Register</button>
        {error && <p>{error}</p>}
    </form>
  )
}
export default RegisterForm