import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import BoxCollection from '../boxCollection/BoxCollection'


import useAuth from '../../hooks/useAuth'


import './PollSection.css'

export default function PollSection() {
    const [polls, setPolls] = useState([])
    const { auth } = useAuth();

    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axiosPrivate.get(`/poll`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    setPolls(response.data.data)
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
        <div className='PollSection'>
            <h2>Polls</h2>
            <BoxCollection boxes={polls} section="polls" />
        </div>
    )
}