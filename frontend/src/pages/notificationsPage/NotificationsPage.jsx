import "./NotificationsPage.css";
import BoxCollection from "../../components/boxCollection/BoxCollection";
import Navbar from "../../components/navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

const NotificationsPage = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const [pastNotifications, setPastNotifications] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axiosPrivate.get(`/pastnotifications`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    setPastNotifications(response.data.data)
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
        <div className="NotificationsPage">
            <Navbar loginType="logout" />
            <h1>Past Notifications</h1>
            {!errorMessage ?
                <BoxCollection boxes={pastNotifications} section="events" />
                :
                <p className="errorMessage">{errorMessage}</p>
            }
        </div>
    );
};
export default NotificationsPage;
