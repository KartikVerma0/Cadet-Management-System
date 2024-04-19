import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import BoxCollection from '../boxCollection/BoxCollection'
import { BACKEND_BASE_STRING } from '../../env'

import './EventsSection.css'

export default function EventsSection() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axios.get(`${BACKEND_BASE_STRING}/event`)
                if (response.data.success) {
                    setEvents(response.data.data)
                } else {
                    console.error(response.data.message)
                }
            } catch (e) {
                console.log(e.message)
            }
        }
        getData()
    })

    return (
        <div className='EventsSection'>
            <h2>Events</h2>
            <p>Upcoming Events</p>
            <BoxCollection boxes={events} section="events" />
            <section>
                <span className='font-green'>Click check mark to acknowledge your presence in the event</span>
                <span className='font-red'>Click cross mark to mark your absence in the event</span>
            </section>
            <Link to="/pastevents">Past Events</Link>
        </div>
    )
}