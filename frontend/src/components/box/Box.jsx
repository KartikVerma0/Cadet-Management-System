import PropTypes from 'prop-types'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EastIcon from '@mui/icons-material/East';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import MessageModal from '../messageModal/MessageModal';
import { axiosPrivate } from '../../api/axios'
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'


//spinner component related imports
import { spinner } from '../../hooks/useSpinner.jsx'
import useSpinner from '../../hooks/useSpinner.jsx'

import permissionsMapping from '../../permissionsMapping.js';

import useAuth from '../../hooks/useAuth'

import EventContext from '../../context/EventContext.jsx'
import PollContext from '../../context/PollContext.jsx'
import NotificationContext from '../../context/NotificationContext.jsx'
import './Box.css'

export default function Box({ info, section, showResponseLink = true }) {


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
        if (section !== 'notifications' && (auth.permissions.includes(permissionsMapping.canRespondToPoll) || auth.permissions.includes(permissionsMapping.canRespondToEvent))) {
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

    const [isExtraOptionsPermitted, setIsExtraOptionsPermitted] = useState(false)

    useEffect(() => {
        const showExtraOptions = () => {
            if (section === "events" && (auth.permissions.includes(permissionsMapping.canDeleteEvent) || auth.permissions.includes(permissionsMapping.canEditEvent))) {
                setIsExtraOptionsPermitted(true)
            }
            else if (section === "polls" && (auth.permissions.includes(permissionsMapping.canDeletePoll) || auth.permissions.includes(permissionsMapping.canEditPoll))) {
                setIsExtraOptionsPermitted(true)
            }
            else if (section === "notifications" && (auth.permissions.includes(permissionsMapping.canDeleteNotification) || auth.permissions.includes(permissionsMapping.canEditNotification))) {
                setIsExtraOptionsPermitted(true)
            }
        }
        showExtraOptions()
    }, [])

    const [extraOptionsVisible, setExtraOptionsVisible] = useState(false)

    const [hasErrorDeleting, setHasErrorDeleting] = useState(false)
    const [hasErrorDeletingMessage, setHasErrorDeletingMessage] = useState('')

    const { events, setEvents } = useContext(EventContext)
    const { polls, setPolls } = useContext(PollContext)
    const { notifications, setNotifications } = useContext(NotificationContext)

    const handleDeleteBox = async () => {
        setHasErrorDeletingMessage('')
        try {
            const response = await axiosPrivate.delete(`/delete/${section}?${section}Id=${_id}`)
            if (!response.data.success) {
                setHasErrorDeleting(true)
                setHasErrorDeletingMessage(response.data.message)
            }

            if (section === "polls") {
                const newPolls = polls.filter((poll) => {
                    return poll._id !== _id
                })
                setPolls(newPolls)
            }
            else if (section === "events") {
                const newEvents = events.filter((event) => {
                    return event._id !== _id
                })
                setEvents(newEvents)
            }
            else if (section === "notifications") {
                const newNotifications = notifications.filter((notification) => {
                    return notification._id !== _id
                })
                setNotifications(newNotifications)
            }

        } catch (err) {
            console.error(err)
            setHasErrorDeleting(true)
            setHasErrorDeletingMessage(err.message)
        }
    }

    const handleEditBox = () => {

    }


    const handleResponse = async (response) => {
        showSpinner()
        setHasResponded(false)
        const data = { dataId: _id, userName: auth.name, userEmail: auth.email, enrollmentNumber: auth.enrollmentNumber, nccWing: auth.nccWing, address: auth.address, mobileNumber: auth.mobileNumber, gender: auth.gender, department: auth.department, rollNumber: auth.rollNumber, academicYear: auth.academicYear, response };
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
            {isExtraOptionsPermitted && <button className='extraOptionsBtn' onClick={() => { setExtraOptionsVisible(prev => !prev) }}>...</button>}
            {
                extraOptionsVisible &&
                <>
                    <div className='extraOptions'>
                        {section === "events" && (auth.permissions.includes(permissionsMapping.canDeleteEvent)) && <span className='delete' onClick={handleDeleteBox}><DeleteOutlineIcon />Delete Event</span>}
                        {section === "events" && (auth.permissions.includes(permissionsMapping.canEditEvent)) && <span className='edit' onClick={handleEditBox}><EditIcon />Edit Event</span>}
                        {section === "polls" && (auth.permissions.includes(permissionsMapping.canDeletePoll)) && <span className='delete' onClick={handleDeleteBox}><DeleteOutlineIcon />Delete Poll</span>}
                        {section === "polls" && (auth.permissions.includes(permissionsMapping.canEditPoll)) && <span className='edit' onClick={handleEditBox}><EditIcon />Edit Poll</span>}
                        {section === "notifications" && (auth.permissions.includes(permissionsMapping.canDeleteNotification)) && <span className='delete' onClick={handleDeleteBox}><DeleteOutlineIcon />Delete Notification</span>}
                        {section === "notifications" && (auth.permissions.includes(permissionsMapping.canEditNotification)) && <span className='edit' onClick={handleEditBox}><EditIcon />Edit Notification</span>}
                    </div>
                    {hasErrorDeleting && <MessageModal closeButtonHandler={setHasErrorDeleting} message={hasErrorDeletingMessage} hasError={hasErrorDeleting} />}
                </>
            }
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
            {showResponseLink && auth.permissions.includes(permissionsMapping.canSeeEventResponses) && (section === "events") && <Link to={`/responses/events/${_id}`} className='responses'><span>Responses</span><EastIcon /></Link>}
            {showResponseLink && auth.permissions.includes(permissionsMapping.canSeePollResponses) && (section === "polls") && <Link to={`/responses/polls/${_id}`} className='responses'><span>Responses</span><EastIcon /></Link>}
            {hasResponded && <MessageModal closeButtonHandler={setHasResponded} message={responseMessage} hasError={hasError} />}
        </div>
    )
}

Box.propTypes = {
    info: PropTypes.object.isRequired,
    section: PropTypes.string,
    showResponseLink: PropTypes.bool
}