import "./MarkAttendanceCard.css";
import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useSpinner from "../../hooks/useSpinner.jsx";
import { useState } from "react";
import { spinner } from "../../hooks/useSpinner.jsx";

const MarkAttendanceCard = ({ data, eventID, handleAttendance, eventDate }) => {

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const { name, enrollmentNumber, rollNumber, nccWing } = data;

    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const axiosPrivate = useAxiosPrivate()

    const handleResponse = async () => {
        showSpinner()
        let result = undefined;
        try {
            result = await axiosPrivate.post(`/attendance`, { eventID, cadetID: data._id, group: enrollmentNumber ? 'cadet' : 'probation', eventDate })

            if (result.data.success) {
                setHasError(false)
                handleAttendance(data)
            } else {
                setHasError(true)
                setErrorMessage(result.data.message)
            }
            hideSpinner()
        } catch (err) {
            setHasError(true)
            hideSpinner()
            console.error(err.message)
            setErrorMessage(err.message)

        }
    }

    return (
        <div className={`MarkAttendanceCard ${nccWing === 'Navy' ? 'darkBlueBg' : nccWing === 'Army' ? 'redBg' : nccWing === 'Air' ? 'lightBlueBg' : ''}`}>
            <section className='descSection'>
                <p className='title'>{name}</p>
                <p className='enrollmentNumber'>{enrollmentNumber ? enrollmentNumber.toUpperCase() : rollNumber}</p>
                <p className='nccWing'>{nccWing}</p>
            </section>
            <section className='actions'>
                <button onClick={handleResponse}><CheckIcon /></button>
                {spinnerVisible && spinner("rgba(0, 174, 239, 1)")}
                {hasError && <p className="errorMessage">{errorMessage}</p>}
            </section>
        </div>);
};
export default MarkAttendanceCard;

MarkAttendanceCard.propTypes = {
    data: PropTypes.object,
    eventID: PropTypes.string,
    handleAttendance: PropTypes.func,
    eventDate: PropTypes.string
}
