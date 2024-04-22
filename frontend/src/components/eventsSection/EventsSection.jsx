import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import BoxCollection from '../boxCollection/BoxCollection'
import useAuth from '../../hooks/useAuth'

import EventContext from '../../context/EventContext.jsx'

import './EventsSection.css'

export default function EventsSection() {
    const { auth } = useAuth();

    const { events, setEvents } = useContext(EventContext)


    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axiosPrivate.get(`/event`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
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
    }, [])

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