import { useState, useEffect } from 'react'
import axios from 'axios'
import BoxCollection from '../boxCollection/BoxCollection'
import { BACKEND_BASE_STRING } from '../../env'
import './PollSection.css'

export default function PollSection() {
    const [polls, setPolls] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axios.get(`${BACKEND_BASE_STRING}/poll`)
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