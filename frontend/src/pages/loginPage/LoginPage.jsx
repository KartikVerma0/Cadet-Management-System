import { useParams } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import AuthForm from "../../components/authForm/AuthForm"

import "./LoginPage.css"

export default function LoginPage() {
    const { role } = useParams()
    return (
        <div className="LoginPage">
            <Navbar loginType={"signup"} />
            <AuthForm role={role} authType="login" />
        </div>
    )
}