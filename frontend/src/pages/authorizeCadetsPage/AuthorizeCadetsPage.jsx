import "./AuthorizeCadetsPage.css";
import Navbar from "../../components/navbar/Navbar";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useSpinner from "../../hooks/useSpinner.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box2 } from "../../components/box2/Box2.jsx";
import { spinner } from "../../hooks/useSpinner.jsx";

const AuthorizeCadetsPage = () => {
    const { auth } = useAuth()
    const [cadets, setCadets] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const { register, handleSubmit } = useForm()
    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const submitHandler = async (data) => {
        showSpinner()


        try {
            let response = await axiosPrivate.get(`/cadets?filter=${data.name}`, data, {
                headers: {
                    Authorization: `BEARER ${auth.accessToken}`
                },
                withCredentials: true
            })
            if (response.data.success) {
                setCadets(response.data.cadets)
            } else {
                setCadets([])
                console.error(response.data.message)
            }
        } catch (e) {
            console.log(e)
        }
        hideSpinner()
    }

    return (
        <div className="AuthorizeCadetsPage">
            <Navbar loginType="logout" />
            <h1>Authorize Cadets</h1>
            <form className="searchCadetForm" onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="name">Search Cadet:</label>
                <input type="text" id="name" {...register("name")} />
                <button type="submit">{spinnerVisible ? spinner("rgba(150, 100, 0, 1)") : <PersonSearchOutlinedIcon />}</button>
            </form>

            <main>
                {cadets?.length > 0 ?
                    cadets.map((cadet) => (
                        <Box2 key={cadet._id} data={cadet} />
                    ))
                    :
                    <p className='errorMessage'>No cadet found</p>
                }
            </main>
        </div>
    );
};
export default AuthorizeCadetsPage;

