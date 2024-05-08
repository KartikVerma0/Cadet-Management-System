import "./Box3.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useSpinner from "../../hooks/useSpinner.jsx";
import { useState } from "react";
import { spinner } from "../../hooks/useSpinner.jsx";

const Box3 = ({ data }) => {
    const axiosPrivate = useAxiosPrivate()
    const [selectedResponse, setSelectedResponse] = useState('')
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()


    const handleResponse = async (selection, dataId) => {

        showSpinner()
        try {
            let response = undefined
            if (selection) {
                response = await axiosPrivate.put(`/user/approve`, { dataId }, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
            } else {
                response = await axiosPrivate.delete(`/user?dataId=${dataId}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
            }
            if (response.data.success) {
                setSelectedResponse(selection);
            } else {
                setHasError(true)
                setErrorMessage(response.data.message)
                console.error(response.data.message)
            }
        } catch (e) {
            console.log(e)
        }
        hideSpinner()

    }

    const { auth } = useAuth()
    return (
        <div key={data._id} className="Box3">
            <span className="label">Name:</span>
            <p className="text">{data.name}</p>
            <span className="label">NCC Wing:</span>
            <p className="text">{data.nccWing}</p>
            <span className="label">Gender:</span>
            <p className="text">{data.gender}</p>
            <span className="label">Roll Number:</span>
            <p className="text">{data.rollNumber}</p>
            <div className="actions">
                <button onClick={() => { handleResponse(true, data._id) }} className={selectedResponse !== '' ? (selectedResponse === true ? '' : 'notSelected') : 'notSelected'}>{spinnerVisible ? spinner("rgba(150, 100, 0, 1)") : <CheckIcon />}</button>
                <button onClick={() => { handleResponse(false, data._id) }} className={selectedResponse !== '' ? (selectedResponse === false ? '' : 'notSelected') : 'notSelected'}>{spinnerVisible ? spinner("rgba(150, 100, 0, 1)") : <CloseIcon />}</button>
            </div>
            {hasError ? <p className="errorMessage">{errorMessage}</p> : ''}
        </div>
    );
};

export default Box3

Box3.propTypes = {
    data: PropTypes.object
}
