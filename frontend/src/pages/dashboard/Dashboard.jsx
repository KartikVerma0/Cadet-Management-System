import Navbar from '../../components/navbar/Navbar'
import SpecialNavbar from '../../components/specialNavbar/SpecialNavbar'
import AttendanceSection from '../../components/attendanceSection/AttendanceSection'
import EventsSection from '../../components/eventsSection/EventsSection'
import PollSection from '../../components/pollSection/PollSection'
import NotificationSection from '../../components/notificationSection/NotificationSection'
import "./Dashboard.css"
import { useLocation, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { PollProvider } from '../../context/PollContext'
import { EventProvider } from '../../context/EventContext'
import { NotificationProvider } from '../../context/NotificationContext'

export default function Dashboard() {

    const { auth } = useAuth();
    const location = useLocation()

    if (auth.accessToken === undefined) {
        return (
            <Navigate to="/" state={{ from: location }} replace />
        )
    } else {
        return (
            <div className="Dashboard">
                <Navbar loginType='logout' />
                <NotificationProvider>
                    <PollProvider>
                        <EventProvider>
                            {/* only show special navbar to people that have permissions */}
                            <SpecialNavbar />
                            <AttendanceSection />
                            <EventsSection />
                        </EventProvider>

                        <PollSection />
                    </PollProvider>
                    <NotificationSection />
                </NotificationProvider>
            </div >
        )
    }
}