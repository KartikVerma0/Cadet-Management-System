import { createContext, useState } from "react";
import PropTypes from 'prop-types'


const NotificationContext = createContext({})
export default NotificationContext

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([])

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
}

NotificationProvider.propTypes = {
    children: PropTypes.node
}