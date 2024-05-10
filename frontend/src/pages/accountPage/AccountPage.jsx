import "./AccountPage.css";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FeedbackForm from "../../components/feedbackForm/FeedbackForm.jsx";
import Navbar from "../../components/navbar/Navbar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ProfileInfoForm from "../../components/profileInfoForm/ProfileInfoForm.jsx";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useEffect, useState } from "react";

/**
 * React component for the user account page.
 *
 * Displays user profile information and a feedback form.
 * Allows editing of some profile information (address, mobile number, enrollment number, academic year for cadets).
 * Fetches user data on component mount and updates auth state on successful profile edit.
 *
 * @returns {JSX.Element} The account page component.
 */
export default function AccountPage() {
    const axiosPrivate = useAxiosPrivate() // Custom hook for authenticated API calls
    const [activeSection, setActiveSection] = useState('profile'); // Active section ('profile' or 'feedback')
    const [userData, setUserData] = useState({}) // User data
    const { auth } = useAuth() // User authentication state and setter
    const [errMsg, setErrMsg] = useState('') // Error message state



    // Fetch user data on component mount
    useEffect(() => {
        const getUserData = async function () {
            try {
                const response = await axiosPrivate.get(`/user?role=${auth.role}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    //formatting dob before setting user data
                    const dob = new Date(response.data.userData.dob)
                    const formattedDate = `${dob.getUTCDate()}-${dob.getUTCMonth() + 1}-${dob.getUTCFullYear()}`;
                    response.data.userData.dob = formattedDate
                    setUserData(response.data.userData)
                } else {
                    throw new Error(response.data.message)
                }
            } catch (err) {
                console.error(err.message)
            }
        }
        getUserData()

    }, [auth.accessToken]) // Re-fetch data on access token change






    return (
        <div className='AccountPage'>
            <Navbar loginType='logout' />

            <main>
                <div className="leftSide">
                    <span
                        className={activeSection === 'profile' ? 'activeIcon' : ''}
                        onClick={() => setActiveSection('profile')}
                    >
                        <PersonOutlineIcon /><p>Profile Information</p>
                    </span>
                    <span
                        className={activeSection === 'feedback' ? 'activeIcon' : ''}
                        onClick={() => setActiveSection('feedback')}
                    >
                        <ChatBubbleOutlineOutlinedIcon /><p>Feedback</p>
                    </span>
                </div>
                <div className="rightSide">
                    {activeSection === 'profile' && userData && Object.keys(userData).length > 0 &&
                        <>
                            <h1>Profile Information</h1>
                            <ProfileInfoForm userData={userData} setErrMsg={setErrMsg} />
                            {errMsg && <p className='font-red'>{errMsg.toString()}</p>}
                        </>
                    }
                    {activeSection === 'feedback' &&
                        <>
                            <h1>Feedback</h1>
                            <FeedbackForm />
                        </>
                    }
                </div>
            </main >
        </div >
    )
}