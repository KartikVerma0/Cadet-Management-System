import "./FourOFourPage.css";
import Navbar from "../../components/navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * React component for the 404 Not Found page.
 *
 * Handles redirection based on user authentication status:
 * - Logged-in users with a valid access token are redirected to the dashboard.
 * - Non-logged-in users are redirected to the home page.
 *
 * Displays a 404 error message with a playful message and a short waiting period.
 *
 * @returns {JSX.Element} The 404 Not Found page component.
 */
export default function FourOFourPage() {
    const navigate = useNavigate();
    const { auth } = useAuth()

    // Redirect based on authentication status after a delay
    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            if (auth.accessToken) {
                // Logged-in user: redirect to dashboard
                navigate("/dashboard", { replace: true })
            } else {
                // Non-logged-in user: redirect to home page
                navigate("/")
            }

        }, 2000)

        return () => {
            clearTimeout(redirectTimeout)
        }
    }, [])
    return (
        <div className='FourOFour'>
            <Navbar loginType={auth.accessToken ? 'logout' : 'login'} />
            <section>
                <span className='errorCode'><span>4</span><span>0</span><span>4</span></span>
                <p><span>Oops! You&apos;ve wandered into the void. Our servers seem to be playing hide  and seek.</span><span> While we locate the missing page, how about a game of digital  hide and seek?</span><span> Count to 404 and see if you find what you&apos;re looking  for!</span></p>
            </section>
        </div>
    )
}