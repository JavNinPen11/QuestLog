import { createContext, useState, useEffect, useContext } from "react";
import { getMe } from "../api/auth.jsx";

export const UserContext = createContext()

export function UserProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        getMe()
        .then(user => setUser(user))
        .finally(() => setLoading(false))
    }, [])
    return(
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    )
}
export const useAuth = () => useContext(UserContext)