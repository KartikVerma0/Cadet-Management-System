import PropTypes from 'prop-types';
import "./Navbar.css"
import { Link } from 'react-router-dom';

import axios from '../../api/axios.js'

import useAuth from '../../hooks/useAuth.js';

export default function Navbar({ loginType }) {

    const { auth, setAuth } = useAuth()
    const role = auth.role

    const handleLogout = async () => {
        try {
            await axios.get(`/logout/${role}`, {
                withCredentials: true
            })
            setAuth({})

        } catch (err) {
            console.log(err)
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
            {loginType === "logout" && <button className="NavLink" onClick={handleLogout}>LOGOUT</button>}

        </nav >
    )
}

Navbar.propTypes = {
    loginType: PropTypes.string.isRequired
}