import { Link } from 'react-router-dom'
import BoxCollection from '../boxCollection/BoxCollection'
import './EventsSection.css'

export default function EventsSection() {
    const events = [
        {
            name: "Event Name",
            date: "Event Date/Time",
            duration: "Event Duration",
            note: "Event Note",
            id: 1
        },
        {
            name: "Event Name",
            date: "Event Date/Time",
            duration: "Event Duration",
            note: "Event Note",
            id: 2
        },
        {
            name: "Event Name",
            date: "Event Date/Time",
            duration: "Event Duration",
            note: "Event Note",
            id: 3
        },
        {
            name: "Event Name",
            date: "Event Date/Time",
            duration: "Event Duration",
            note: "Event Note",
            id: 4
        },
        {
            name: "Event Name",
            date: "Event Date/Time",
            duration: "Event Duration",
            note: "Event Note",
            id: 5
        },
        {
            name: "Event Name",
            date: "Event Date/Time",
            duration: "Event Duration",
            note: "Event Note",
            id: 6
        },
    ]
    return (
        <div className='EventsSection'>
            <h2>Events</h2>
            <p>Upcoming Events</p>
            <BoxCollection boxes={events} section="events" />
            <section>
                <span className='font-green'>Click check mark to acknowledge your presence in the event</span>
                <span className='font-red'>Click cross mark to mark your absence in the event</span>
            </section>
            <Link to="/events">Past Events</Link>
        </div>
    )
}