import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import BoxCollection from '../boxCollection/BoxCollection'

import useAuth from '../../hooks/useAuth'


import './NotificationSection.css'

export default function NotificationSection() {
    const [notifications, setNotifications] = useState([])
    const { auth } = useAuth();

    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axiosPrivate.get(`/notification`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
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