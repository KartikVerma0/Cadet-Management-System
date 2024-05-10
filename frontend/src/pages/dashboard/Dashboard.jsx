import "./Dashboard.css";
import AttendanceSection from "../../components/attendanceSection/AttendanceSection";
import CommonInfoNavbar from "../../components/commonInfoNavbar/CommonInfoNavbar";
import EventsSection from "../../components/eventsSection/EventsSection";
import Navbar from "../../components/navbar/Navbar";
import NotificationSection from "../../components/notificationSection/NotificationSection";
import PollSection from "../../components/pollSection/PollSection";
import SpecialNavbar from "../../components/specialNavbar/SpecialNavbar";
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { EventProvider } from "../../context/EventContext";
import { NotificationProvider } from "../../context/NotificationContext";
import { PollProvider } from "../../context/PollContext";

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
                            <CommonInfoNavbar />
                            {/* Implement Attendance section */}
                            {/* <AttendanceSection /> */}
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