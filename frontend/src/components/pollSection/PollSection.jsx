import "./PollSection.css";
import BoxCollection from "../boxCollection/BoxCollection";
import EastIcon from "@mui/icons-material/East";
import PollContext from "../../context/PollContext.jsx";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

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
            {auth.role === 'ANO_CTO'
                ?
                <Link to={'/polls'}><h2><span>Polls</span><EastIcon /></h2></Link>
                :
                <h2><span>Polls</span></h2>
            }
            <BoxCollection boxes={polls} section="polls" />
        </div >
    )
}