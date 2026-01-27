import {Outlet} from "react-router-dom"
import MainNav from "../components/MainNav"

export default function MainLayout(){
    return(
        <>
            <MainNav/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}