import { useParams } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import SignUpForm from "../../components/signupForm/SignUpForm"

import "./SignUpPage.css"

export default function SignUpPage() {
    const { role } = useParams()
    return (
        <div className="LoginPage">
            <Navbar loginType={"login"} />
            <SignUpForm role={role} />
        </div>
    )
}