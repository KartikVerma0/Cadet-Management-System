import { createContext, useState } from "react";
import PropTypes from 'prop-types'


const EventContext = createContext({})
export default EventContext

export function EventProvider({ children }) {
    const [events, setEvents] = useState([])

    return (
        <EventContext.Provider value={{ events, setEvents }}>
            {children}
        </EventContext.Provider>
    )
}

EventProvider.propTypes = {
    children: PropTypes.node
}