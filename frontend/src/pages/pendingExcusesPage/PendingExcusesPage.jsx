import Navbar from '../../components/navbar/Navbar'
import PendingExcuseBox from '../../components/pendingExcuseBox/PendingExcuseBox'
import useAuth from '../../hooks/useAuth'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './PendingExcusesPage.css'

export default function PendingExcusesPage() {
    const { auth } = useAuth()
    const [nccWing, setNccWing] = useState(auth.nccWing)
    const [pendingExcuses, setPendingExcuses] = useState([])
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axiosPrivate.get(`/excuse/pending?nccWing=${nccWing}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    setPendingExcuses(response.data.pendingExcuses)
                } else {
                    console.error(response.data.message)
                }
            } catch (e) {
                console.log(e.message)
            }
        }
        getData()
    }, [auth.accessToken, nccWing])

    return (
        <div className='PendingExcusesPage'>
            <Navbar loginType='logout' />
            <h1>Pending Excuses</h1>
            <form>
                <label htmlFor="nccWing">Select Wing:</label>
                <select defaultValue={auth.nccWing} id='nccWing' onChange={(e) => { setNccWing(e.target.value) }}>
                    <option value="All">All</option>
                    <option value="Navy" selected={auth.nccWing === 'Navy'}>Navy</option>
                    <option value="Air" selected={auth.nccWing === 'Air'}>Air</option>
                    <option value="Army" selected={auth.nccWing === 'Army'}>Army</option>
                </select>
            </form>

            <main>
                {pendingExcuses?.length > 0 ?
                    pendingExcuses.map((excuse, index) => (
                        <PendingExcuseBox key={excuse._id}
                            excuseId={excuse._id}
                            eventName={excuse.eventId.name}
                            eventDate={excuse.eventId.date}
                            excuseBy={excuse.createdBy}
                            excuseDescription={excuse.description}
                            proofs={excuse.files}
                            position={index + 1}
                            isRejected={excuse.isRejected}
                            isPending={excuse.isPending}
                        />
                    ))
                    :
                    <p className='errorMessage'>No pending excuses found</p>
                }
            </main>
        </div>
    )
}