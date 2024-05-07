import "./PollsPage.css";
import BoxCollection from "../../components/boxCollection/BoxCollection";
import Navbar from "../../components/navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

const PollsPage = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const [pastPolls, setPastPolls] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axiosPrivate.get(`/pastpolls`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    setPastPolls(response.data.data)
                } else {
                    setErrorMessage(response.data.message)
                    console.error(response.data.message)
                }
            } catch (e) {
                console.log(e.message)
            }
        }
        getData()
    }, [])

    return (
        <div className="PollsPage">
            <Navbar loginType="logout" />
            <h1>Past Polls</h1>
            {!errorMessage ?
                <BoxCollection boxes={pastPolls} section="events" />
                :
                <p className="errorMessage">{errorMessage}</p>
            }
        </div>
    );
};
export default PollsPage;
