import { createContext, useState, useEffect } from "react";
import { getMe } from "../api/auth.jsx";

export const UserContext = createContext()

export function UserProvider({children}){
    const [user, setUser] = useState(null)

    useEffect(() =>{
        getMe()
        .then(setUser)
    }, [])
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}