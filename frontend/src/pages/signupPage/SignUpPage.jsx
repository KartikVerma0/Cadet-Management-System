import { useParams } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import AuthForm from "../../components/authForm/AuthForm"

import "./SignUpPage.css"

export default function SignUpPage() {
    const { role } = useParams()
    return (
        <div className="LoginPage">
            <Navbar loginType={"login"} />
            <AuthForm role={role} authType="signup" />
        </div>
    )
}