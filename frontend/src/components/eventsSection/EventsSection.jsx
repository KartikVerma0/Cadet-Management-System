import "./EventsSection.css";
import BoxCollection from "../boxCollection/BoxCollection";
import EastIcon from "@mui/icons-material/East";
import EventContext from "../../context/EventContext.jsx";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

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
            {auth.role === 'ANO_CTO'
                ?
                <Link to={'/events'}><h2><span>Events</span><EastIcon /></h2></Link>
                :
                <h2><span>Events</span></h2>
            }
            <p>Upcoming Events</p>
            <BoxCollection boxes={events} section="events" />
            <section>
                <span className='font-green'>Click check mark to acknowledge your presence in the event</span>
                <span className='font-red'>Click cross mark to mark your absence in the event</span>
            </section>
        </div>
    )
}