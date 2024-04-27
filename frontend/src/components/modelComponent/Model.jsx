import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form'
import { useState, useContext } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Joi from 'joi'

import useAuth from '../../hooks/useAuth';

import EventContext from '../../context/EventContext.jsx';
import PollContext from '../../context/PollContext.jsx';
import NotificationContext from '../../context/NotificationContext.jsx';

import "./Model.css"

//spinner component related imports
import { spinner } from '../../hooks/useSpinner.jsx'
import useSpinner from '../../hooks/useSpinner.jsx'


export default function Model({ closeButtonHandler, topic }) {

    let ModelSchema = undefined;
    if (topic === "Event") {
        ModelSchema = Joi.object({
            Event_name: Joi.string().required(),
            Event_date: Joi.date().required(),
            start_time: Joi.string().required(),
            Event_duration: Joi.allow(),
            Event_description: Joi.allow()
        })
    } else if (topic === "Poll") {
        ModelSchema = Joi.object({
            Poll_name: Joi.string().required(),
            Poll_description: Joi.string().required()
        })
    } else if (topic === "Notification") {
        ModelSchema = Joi.object({
            Notification_name: Joi.string().required(),
            Notification_description: Joi.string().required()
        })
    }



    const [faultyInput, setFaultyInput] = useState("")
    const [inputError, setInputError] = useState("")
    const [successSubmit, setSuccessSubmit] = useState(false)
    const [errorSubmit, setErrorSubmit] = useState(false)
    const { register, handleSubmit } = useForm()

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const { setEvents } = useContext(EventContext)
    const { setPolls } = useContext(PollContext)
    const { setNotifications } = useContext(NotificationContext)

    const refreshData = async () => {
        if (topic === 'Poll') {
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
        } else if (topic === 'Event') {
            try {
                let response = await axiosPrivate.get(`/event`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    setEvents(response.data.data)
                } else {
                    console.error(response.data.message)
                }
            } catch (e) {
                console.log(e.message)
            }
        } else if (topic === 'Notification') {
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
    }

    const [isValidFile, setIsValidFile] = useState(true)
    const [invalidFileError, setInvalidFileError] = useState('')
    const [previewSource, setPreviewSource] = useState([])

    const handleValidFileInput = (files) => {

        const isValidPromise = new Promise((resolve, reject) => {
            const keys = Object.keys(files)
            if (keys.length > 2) {
                reject(new Error("Maximum file upload limit is 2"))
            }
            for (let index = 0; index < keys.length; index++) {
                if (files[`${index}`].type.indexOf(`image/`) === -1) {
                    console.log("not image", files[`${index}`].name)
                    reject(new Error("Invalid file type (only images allowed)"))
                }
            }
            resolve(true)
        })
        return isValidPromise;
    }

    const previewFiles = (files) => {
        const keys = Object.keys(files)
        for (let index = 0; index < keys.length; index++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[`${index}`])
            reader.onloadend = () => {
                setPreviewSource((previousSource) => {
                    return [...previousSource, reader.result]
                })
            }
        }
    }

    const handleFileChange = async (e) => {
        setIsValidFile(true)
        setInvalidFileError('')
        setPreviewSource([])
        const files = e.target.files;
        try {
            await handleValidFileInput(files);
            previewFiles(files)
        } catch (err) {
            console.error(err)
            setInvalidFileError(err.message)
            setIsValidFile(false)
            return
        }
    }


    const submitHandler = async (data) => {
        showSpinner()
        setFaultyInput("")
        setInputError("")
        setSuccessSubmit(false)
        setErrorSubmit(false)
        try {
            await ModelSchema.validateAsync(data)

        } catch (e) {
            console.error("Invalid input data :", e.message)
            setFaultyInput(e.message.split("\"")[1])
            setInputError(e.message);
            hideSpinner()
            return;
        }

        if (!isValidFile) {
            hideSpinner()
            return
        }

        try {
            let response = await axiosPrivate.post(`/create/${topic.toLowerCase()}`, { ...data, previewSource }, {
                headers: {
                    Authorization: `BEARER ${auth.accessToken}`
                },
                withCredentials: true
            })
            if (response.data.success) {
                setSuccessSubmit(true)
                setErrorSubmit(false)

            } else {
                console.error(response.data.message)
                setErrorSubmit(true)
                setSuccessSubmit(false)
            }
        } catch (e) {
            console.log(e)
            setErrorSubmit(true)
            setSuccessSubmit(false)
        }
        refreshData()
        hideSpinner()
    }

    return (
        <div className="Model">
            {topic === "Event" && <h3>Create an {topic}</h3>}
            {topic !== "Event" && <h3>Create a {topic}</h3>}
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor={`${topic}_name`}>{topic} name: <span className='font-red'>*</span></label>
                <input type="text" id={`${topic}_name`} {...register(`${topic}_name`)} />
                {faultyInput === `${topic}_name` && <p className='errorMessage'>{inputError}</p>}
                {topic === "Event" &&
                    <>
                        <label htmlFor={`${topic}_date`}>{topic} date: <span className='font-red'>*</span></label>
                        <input type="date" id={`${topic}_date`}  {...register(`${topic}_date`)} />
                        {faultyInput === `${topic}_date` && <p className='errorMessage'>{inputError}</p>}
                        <label htmlFor="start_time">{topic} start time: <span className='font-red'>*</span></label>
                        <input type="time" id="start_time"  {...register("start_time")} />
                        {faultyInput === "start_time" && <p className='errorMessage'>{inputError}</p>}
                        <label htmlFor={`${topic}_duration`}>{topic} duration (in minutes):</label>
                        <input type="number" id={`${topic}_duration`}  {...register(`${topic}_duration`)} />
                        {faultyInput === `${topic}_duration` && <p className='errorMessage'>{inputError}</p>}
                    </>
                }
                <label htmlFor={`${topic}_description`} >{topic} description:</label>
                <textarea name="" id={`${topic}_description`} cols="30" rows="6" {...register(`${topic}_description`)}></textarea>
                <label htmlFor={`${topic}_file`}>Upload images:</label>
                <input type="file" id={`${topic}_file`} multiple onChange={handleFileChange} />
                <p className='errorMessage'>You can upload images of total 5mb</p>
                <section className='previewImagesContainer'>
                    {previewSource.length > 0 && previewSource.map((source, index) =>
                        <img key={index} src={source} className='previewImage' />
                    )}
                </section>
                {!isValidFile && <p className='errorMessage'>{invalidFileError}</p>}
                {faultyInput === `${topic}_description` && <p className='errorMessage'>{inputError}</p>}
                <button>{spinnerVisible ? spinner("rgba(150, 100, 0, 1)") : 'Submit'}</button>
            </form>
            {successSubmit && <p className='successMessage'>Successfull Submition!</p>}
            {errorSubmit && <p className='errorMessage'>Failed Submition!</p>}
            <button onClick={() => { closeButtonHandler("") }}><CloseIcon /></button>
        </div >
    )
}

Model.propTypes = {
    closeButtonHandler: PropTypes.func.isRequired,
    topic: PropTypes.string.isRequired
}