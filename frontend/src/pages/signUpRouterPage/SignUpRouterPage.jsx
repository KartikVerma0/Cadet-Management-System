import Navbar from "../../components/navbar/Navbar"
import AuthSection from "../../components/authSection/AuthSection"
import "./SignUpRouterPage.css"


export default function SignUpRouterPage() {
    return (
        <div className="SignUpRouterPage">
            <Navbar loginType={"login"} />
            <AuthSection authType={"signup"} />
            <span className="creditSection">Developed By Kartik Verma</span>
        </div>
    )
}