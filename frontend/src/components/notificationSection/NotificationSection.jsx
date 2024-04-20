import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { BACKEND_BASE_STRING } from '../../env'
import BoxCollection from '../boxCollection/BoxCollection'

import AuthContext from '../../context/AuthContext'


import './NotificationSection.css'

export default function NotificationSection() {
    const [notifications, setNotifications] = useState([])
    const { auth } = useContext(AuthContext);


    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axios.get(`${BACKEND_BASE_STRING}/notification`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    }
                })
                if (response.data.success) {
                    setNotifications(response.data.data)
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
        <div className='NotificationSection'>
            <h2>Notifications</h2>
            <BoxCollection boxes={notifications} section="notifications" />
        </div>
    )
}