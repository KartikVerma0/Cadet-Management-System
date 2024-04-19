import Navbar from '../../components/navbar/Navbar'
import SpecialNavbar from '../../components/specialNavbar/SpecialNavbar'
import AttendanceSection from '../../components/attendanceSection/AttendanceSection'
import EventsSection from '../../components/eventsSection/EventsSection'
import PollSection from '../../components/pollSection/PollSection'
import NotificationSection from '../../components/notificationSection/NotificationSection'
import "./Dashboard.css"

export default function Dashboard() {

    return (
        <div className="Dashboard">
            <Navbar loginType='logout' />
            {/* only show special navbar to people that have permissions */}
            <SpecialNavbar />
            <AttendanceSection />
            <EventsSection />
            <PollSection />
            <NotificationSection />
        </div>
    )
}