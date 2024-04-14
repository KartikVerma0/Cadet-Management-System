import Navbar from "../../components/navbar/Navbar"
import AuthSection from "../../components/authSection/AuthSection"
import "./IndexPage.css"


export default function IndexPage() {
    return (
        <div className="IndexPage">
            <Navbar loginType={"signup"} />
            <AuthSection authType={"login"} />
            <span className="creditSection">Developed By Kartik Verma</span>
        </div>
    )
}