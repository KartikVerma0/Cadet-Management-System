import "./NotificationSection.css";
import BoxCollection from "../boxCollection/BoxCollection";
import EastIcon from "@mui/icons-material/East";
import NotificationContext from "../../context/NotificationContext.jsx";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotificationSection() {
    const { auth } = useAuth();

    const { notifications, setNotifications } = useContext(NotificationContext)


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
            {auth.role === 'ANO_CTO'
                ?
                <Link to={'/notifications'}><h2><span>Notifications</span><EastIcon /></h2></Link>
                :
                <h2><span>Notifications</span></h2>
            }

            <BoxCollection boxes={notifications} section="notifications" />
        </div>
    )
}