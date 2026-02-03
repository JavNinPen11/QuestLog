import { useAuth } from "../context/userContext";
import {useNavigate, Outlet} from "react-router-dom"

export default function PrivateRoute(){
    const {user, loading} = useAuth()
    const navigate = useNavigate()
    if(loading) return <p>Cargando...</p>
    if(!user) return navigate("/login")
    
    return <Outlet/>
}