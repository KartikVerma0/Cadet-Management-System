import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import './CommonInfoNavbar.css'

export default function CommonInfoNavbar() {
    const { auth } = useAuth()
    return (
        <section className='CommonInfoNavbar'>
            <div>
                <Link to={`/studymaterial`}><ImportContactsOutlinedIcon />Study Material</Link>
                {auth.role === "CADET" && <Link to="/campdetails"><MilitaryTechOutlinedIcon />Camp Details</Link>}
            </div>
            <div>
                <Link to="/settings"><SettingsOutlinedIcon />Settings</Link>
                <Link to="/account"><PersonOutlineOutlinedIcon />Account</Link>
            </div>
        </section>
    )
}