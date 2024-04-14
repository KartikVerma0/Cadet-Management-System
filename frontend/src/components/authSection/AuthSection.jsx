import PropTypes from 'prop-types';
import "./AuthSection.css"
import { Link } from 'react-router-dom';

export default function AuthSection({ authType }) {
    return (
        <nav className='AuthSection'>
            <h1 className='authSectionTitle'>{authType.toUpperCase()}</h1>
            <div className='authLinks'>
                <Link to={`/${authType}/ANO_CTO`} className='authLink'>{authType.toUpperCase()} (ANO/CTO)</Link>
                <Link to={`/${authType}/CADET`} className='authLink'>{authType.toUpperCase()} (CADET)</Link>
                <Link to={`/${authType}/PROBATION`} className='authLink'>{authType.toUpperCase()} (PROBATION)</Link>
            </div>
        </nav>
    )
}

AuthSection.propTypes = {
    authType: PropTypes.string.isRequired,
}