import { useEffect, useContext } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import BoxCollection from '../boxCollection/BoxCollection'
import PollContext from '../../context/PollContext.jsx'

import useAuth from '../../hooks/useAuth'


import './PollSection.css'

export default function PollSection() {
    const { auth } = useAuth();
    const { polls, setPolls } = useContext(PollContext)

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