import "./Navbar.css";
import PropTypes from "prop-types";
import axios from "../../api/axios.js";
import useAuth from "../../hooks/useAuth.js";
import useSpinner from "../../hooks/useSpinner.jsx";
import { Link, useNavigate } from "react-router-dom";
import { spinner } from "../../hooks/useSpinner.jsx";

//spinner component related imports



export default function Navbar({ loginType }) {

    const { auth, setAuth } = useAuth()
    const role = auth.role

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const navigate = useNavigate()

    const handleLogout = async () => {
        showSpinner()
        try {
            setAuth({})
            navigate("/", { replace: true })
            await axios.get(`/logout/${role}`, {
                withCredentials: true
            })
            hideSpinner()

        } catch (err) {
            console.log(err)
            hideSpinner()
        }
    }

    return (
        <nav className="Navbar">
            <div className="leftSection">
                <Link to={auth.accessToken ? "/dashboard" : "/"}>
                    <img src="/nccLogo.png" alt="ncc logo" className="NavbarLogo" />
                    <p className="NavbarTitle"><span>CADET</span> <span>MANAGEMENT</span> <span>SYSTEM</span></p>
                </Link>

            </div>


            {loginType === "login" && <Link to="/" className="NavLink">LOGIN</Link>}
            {loginType === "signup" && <Link to="/signup" className="NavLink">SIGNUP</Link>}
            {loginType === "logout" && <button className="NavLink" onClick={handleLogout}>{spinnerVisible ? spinner("rgba(172, 57, 70, 1)", 70) : "LOGOUT"}</button>}

        </nav >
    )
}

Navbar.propTypes = {
    loginType: PropTypes.string.isRequired
}