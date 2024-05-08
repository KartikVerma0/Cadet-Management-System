import "./ApproveCadetAccountPage.css";
import Box3 from "../../components/box3/Box3";
import Navbar from "../../components/navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

const ApproveCadetAccountPage = () => {

    const { auth } = useAuth()
    const [nccWing, setNccWing] = useState(auth.nccWing)
    const [unapprovedCadets, setUnapprovedCadets] = useState([])
    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axiosPrivate.get(`/user/unapproved?nccWing=${nccWing}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    setUnapprovedCadets(response.data.unapprovedCadets)
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
        <div className='ApproveCadetAccountPage'>
            <Navbar loginType="logout" />
            <h1>Approve Accounts</h1>
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
                {unapprovedCadets?.length > 0 ?
                    unapprovedCadets.map((cadet) => (
                        <Box3 key={cadet._id} data={cadet} />
                    ))
                    :
                    <p className='errorMessage'>No cadet found</p>
                }
            </main>
        </div>
    );
};
export default ApproveCadetAccountPage;
