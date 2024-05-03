import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import MessageModal from '../messageModal/MessageModal';

//spinner component related imports
import { spinner } from '../../hooks/useSpinner.jsx'
import useSpinner from '../../hooks/useSpinner.jsx'
import './PendingExcuseBox.css'

export default function PendingExcuseBox({ excuseId, eventName, eventDate, excuseDescription, excuseBy, proofs, position, isRejected, isPending }) {
    const axiosPrivate = useAxiosPrivate()
    const [hasResponded, setHasResponded] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [hasError, setHasError] = useState(false)

    let defaultResponse = undefined;
    if (isRejected && !isPending) {
        defaultResponse = false
    } else if (!isPending && !isRejected) {
        defaultResponse = true
    }

    const [selectedResponse, setSelectedResponse] = useState(defaultResponse === undefined ? '' : defaultResponse)

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const handleResponse = async (response) => {
        showSpinner()
        setHasResponded(response)
        const data = {
            excuseId,
        };
        let result = undefined;
        try {
            if (response === true) {
                result = await axiosPrivate.post(`/excuse/approve`, data)
            } else if (response === false) {
                result = await axiosPrivate.post(`/excuse/reject`, data)
            }
            if (result.data.success) {
                setHasError(false)
                setHasResponded(true)
                setResponseMessage(result.data.message)
                setSelectedResponse(response)
            } else {
                setHasError(true)
                setHasResponded(true)
                setResponseMessage(result.data.message)
            }
            hideSpinner()
        } catch (err) {
            setHasError(true)
            setHasResponded(true)
            setResponseMessage(err.message)
            hideSpinner()
            console.error(err.message)
        }

    }

    return (
        <div className={position % 3 === 1 ? 'redBg PendingExcuseBox' : position % 3 === 2 ? 'darkBlueBg PendingExcuseBox' : 'lightBlueBg PendingExcuseBox'}>
            <section className='descSection'>
                <p className='title'>{eventName}</p>
                <span className='eventDate'>Event Date: {eventDate}</span>
                <p className='description'>{excuseDescription}</p>
                <span className='excuseBy'>Excuse By: {excuseBy}</span>
            </section>
            <section className='downloadLinks'>
                {
                    proofs.map((url, index) => {
                        return <Link to={url} key={url} target='_blank' className='downloadLink'>View Proof {proofs.length > 1 ? index + 1 : ''}</Link>
                    })
                }
            </section>
            <section className='actions'>
                <button onClick={() => { handleResponse(true) }} className={selectedResponse !== '' ? (selectedResponse === true ? '' : 'notSelected') : 'notSelected'}><CheckIcon /></button>
                <button onClick={() => { handleResponse(false) }} className={selectedResponse !== '' ? (selectedResponse === false ? '' : 'notSelected') : 'notSelected'}><CloseIcon /></button>
                {spinnerVisible && spinner("rgba(0, 174, 239, 1)")}
            </section>
            {hasResponded && <MessageModal closeButtonHandler={setHasResponded} message={responseMessage} hasError={hasError} />}
        </div>
    )
}


PendingExcuseBox.propTypes = {
    excuseId: PropTypes.string,
    eventName: PropTypes.string,
    eventDate: PropTypes.string,
    excuseDescription: PropTypes.string,
    excuseBy: PropTypes.string,
    proofs: PropTypes.array,
    position: PropTypes.number,
    isRejected: PropTypes.bool,
    isPending: PropTypes.bool
}