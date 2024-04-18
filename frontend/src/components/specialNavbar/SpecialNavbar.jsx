import { Link } from 'react-router-dom'
import './SpecialNavbar.css'

export default function SpecialNavbar() {
    return (
        <nav className='SpecialNavbar'>
            <Link to="/create/event">Create an Event</Link>
            <Link to="/create/poll">Create a Poll</Link>
            <Link to="/create/notification">Create a Notification</Link>
        </nav>
    )
}