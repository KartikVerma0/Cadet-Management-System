import PropTypes from 'prop-types';
import "./Navbar.css"
import { Link } from 'react-router-dom';

export default function Navbar({ loginType }) {
    return (
        <nav className="Navbar">
            <div className="leftSection">
                <Link to="/">
                    <img src="/src/assets/nccLogo.png" alt="ncc logo" className="NavbarLogo" />
                    <p className="NavbarTitle"><span>CADET</span> <span>MANAGEMENT</span> <span>SYSTEM</span></p>
                </Link>

            </div>


            {loginType === "login" && <Link to="/" className="NavLink">LOGIN</Link>}
            {loginType === "signup" && <Link to="/signup" className="NavLink">SIGNUP</Link>}
            {loginType === "logout" && <Link to="/logout" className="NavLink">LOGOUT</Link>}

        </nav >
    )
}

Navbar.propTypes = {
    loginType: PropTypes.string.isRequired
}