import PropTypes from 'prop-types'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EastIcon from '@mui/icons-material/East';
import MessageModal from '../messageModal/MessageModal';
import { axiosPrivate } from '../../api/axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

//spinner component related imports
import { spinner } from '../../hooks/useSpinner.jsx'
import useSpinner from '../../hooks/useSpinner.jsx'

import permissionsMapping from '../../permissionsMapping.js';

import useAuth from '../../hooks/useAuth'
import './Box.css'

export default function Box({ info, section }) {


    let { name, date, duration, description, startTime, _id } = info;
    const { auth } = useAuth()
    const [hasResponded, setHasResponded] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [selectedResponse, setSelectedResponse] = useState('')

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()


    useEffect(() => {
        if (section !== 'notifications') {
            const getResponse = async () => {
                try {
                    const res = await axiosPrivate.get(`/response/${section}?dataId=${_id}&email=${auth.email}`)
                    setSelectedResponse(res.data.response)
                } catch (err) {
                    console.error(err)
                }
            }
            getResponse()
        }

    }, [])




    const handleResponse = async (response) => {
        showSpinner()
        setHasResponded(false)
        const data = { dataId: _id, userEmail: auth.email, enrollmentNumber: auth.enrollmentNumber, nccWing: auth.nccWing, response };
        let result = undefined;
        try {
            if (section === "polls") {
                result = await axiosPrivate.post(`/response/${section}`, data)
            } else if (section === "events") {
                result = await axiosPrivate.post(`/response/${section}`, data)
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
        <div className='Box'>
            {name && <div>
                <span className='label'>{section.toUpperCase()} NAME: </span><span>{name}</span>
            </div>
            }
            <div className='sideways'>
                {date && <div>
                    <span className='label'>{section.toUpperCase()} DATE: </span><span>{date}</span>
                </div>
                }
                {duration && <div>
                    <span className='label'>{section.toUpperCase()} DURATION: </span><span>{duration} minutes</span>
                </div>
                }
                {startTime && <div>
                    <span className='label'>{section.toUpperCase()} START TIME: </span><span>{startTime}</span>
                </div>
                }
            </div>
            {description && <div>
                <span className='label'>{section.toUpperCase()} DESCRIPTION: </span><span>{description}</span>
            </div>
            }

            {auth.permissions.includes(permissionsMapping.canRespondToEvent) && (section === "events") &&
                <>
                    <div className='actions'>
                        <button onClick={() => { handleResponse(true) }} className={selectedResponse !== '' ? (selectedResponse === true ? '' : 'notSelected') : ''}><CheckIcon /></button>
                        <button onClick={() => { handleResponse(false) }} className={selectedResponse !== '' ? (selectedResponse === false ? '' : 'notSelected') : ''}><CloseIcon /></button>
                    </div>
                    {spinnerVisible && spinner("rgba(0, 174, 239, 1)")}
                </>
            }
            {auth.permissions.includes(permissionsMapping.canRespondToPoll) && (section === "polls") &&
                <>
                    <div className='actions'>
                        <button onClick={() => { handleResponse(true) }} className={selectedResponse !== '' ? (selectedResponse === true ? '' : 'notSelected') : ''}><CheckIcon /></button>
                        <button onClick={() => { handleResponse(false) }} className={selectedResponse !== '' ? (selectedResponse === false ? '' : 'notSelected') : ''}><CloseIcon /></button>
                    </div>
                    {spinnerVisible && spinner("rgba(0, 174, 239, 1)")}
                </>
            }
            {auth.permissions.includes(permissionsMapping.canSeeEventResponses) && (section === "events") && <Link to={`/responses/events/${_id}`} className='responses'><span>Responses</span><EastIcon /></Link>}
            {auth.permissions.includes(permissionsMapping.canSeePollResponses) && (section === "polls") && <Link to={`/responses/polls/${_id}`} className='responses'><span>Responses</span><EastIcon /></Link>}
            {hasResponded && <MessageModal closeButtonHandler={setHasResponded} message={responseMessage} hasError={hasError} />}
        </div>
    )
}

Box.propTypes = {
    info: PropTypes.object.isRequired,
    section: PropTypes.string
}