import PropTypes from 'prop-types';
import "./Navbar.css"
import { Link } from 'react-router-dom';

//spinner component related imports
import { spinner } from '../../hooks/useSpinner.jsx'
import useSpinner from '../../hooks/useSpinner.jsx'

import axios from '../../api/axios.js'

import useAuth from '../../hooks/useAuth.js';

export default function Navbar({ loginType }) {

    const { auth, setAuth } = useAuth()
    const role = auth.role

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const handleLogout = async () => {
        showSpinner()
        try {
            await axios.get(`/logout/${role}`, {
                withCredentials: true
            })
            setAuth({})

        } catch (err) {
            console.log(err)
            hideSpinner()
        }
    }

    return (
        <nav className="Navbar">
            <div className="leftSection">
                <Link to="/">
                    <img src="/nccLogo.png" alt="ncc logo" className="NavbarLogo" />
                    <p className="NavbarTitle"><span>CADET</span> <span>MANAGEMENT</span> <span>SYSTEM</span></p>
                </Link>

            </div>


            {loginType === "login" && <Link to="/" className="NavLink">LOGIN</Link>}
            {loginType === "signup" && <Link to="/signup" className="NavLink">SIGNUP</Link>}
            {loginType === "logout" && <button className="NavLink" onClick={handleLogout}>{spinnerVisible ? spinner("rgba(172, 57, 70, 1)") : "LOGOUT"}</button>}

        </nav >
    )
}

Navbar.propTypes = {
    loginType: PropTypes.string.isRequired
}