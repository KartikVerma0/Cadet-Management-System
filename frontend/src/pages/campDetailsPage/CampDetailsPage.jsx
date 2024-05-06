import "./CampDetailsPage.css";
import CampDetailsBox from "../../components/campDetailsBox/CampDetailsBox.jsx";
import Model from "../../components/modelComponent/Model.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import useAuth from "../../hooks/useAuth.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useEffect, useState } from "react";

const CampDetailsPage = () => {

    const [isAddCampModelOpen, setIsAddCampModelOpen] = useState("")
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [camps, setCamps] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axiosPrivate.get(`/camp`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    setCamps(response.data.camps)
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
        <div className="CampDetailsPage">
            <Navbar loginType="logout" />
            <h1>Camp Details</h1>
            <section>
                <h2>Your Camps</h2>
                <div>
                    <CampDetailsBox type={'addNew'} addModel={setIsAddCampModelOpen} />
                    {
                        camps.map((camp) => {
                            return <CampDetailsBox
                                key={camp._id}
                                title={camp.title}
                                startDate={camp.startDate}
                                endDate={camp.endDate}
                                location={camp.location}
                                description={camp.description}
                            />
                        })
                    }
                </div>
            </section>
            {isAddCampModelOpen === "open" && <Model closeButtonHandler={setIsAddCampModelOpen} topic="New_Camp" />}
        </div>
    );
};
export default CampDetailsPage;
