import "./Model.css";
import CloseIcon from "@mui/icons-material/Close";
import EventContext from "../../context/EventContext.jsx";
import Joi from "joi";
import NotificationContext from "../../context/NotificationContext.jsx";
import PollContext from "../../context/PollContext.jsx";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useSpinner from "../../hooks/useSpinner.jsx";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { spinner } from "../../hooks/useSpinner.jsx";

export default function Model({ closeButtonHandler, topic }) {

    let ModelSchema = undefined;
    if (topic === "Event") {
        ModelSchema = Joi.object({
            Event_name: Joi.string().required(),
            Event_date: Joi.date().required(),
            start_time: Joi.string().required(),
            Event_duration: Joi.allow(),
            Event_description: Joi.string().allow('').optional()
        })
    } else if (topic === "Poll") {
        ModelSchema = Joi.object({
            Poll_name: Joi.string().required(),
            Poll_description: Joi.string().allow('').optional()
        })
    } else if (topic === "Notification") {
        ModelSchema = Joi.object({
            Notification_name: Joi.string().required(),
            Notification_description: Joi.string().allow('').optional()
        })
    } else if (topic === "Study_Material") {
        ModelSchema = Joi.object({
            Study_Material_name: Joi.string().required(),
            Study_Material_description: Joi.string().allow('').optional(),
            nccWing: Joi.string().required()
        })
    } else if (topic === "New_Camp") {
        ModelSchema = Joi.object({
            New_Camp_name: Joi.string().required(),
            New_Camp_startDate: Joi.date().required(),
            New_Camp_endDate: Joi.date().required(),
            New_Camp_location: Joi.string().required(),
            New_Camp_description: Joi.string().allow('').optional(),
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
                if (topic !== "Study_Material" && files[`${index}`].type.indexOf(`image/`) === -1) {
                    console.error("not image", files[`${index}`].name)
                    reject(new Error("Invalid file type (only images allowed)"))
                } else if (topic !== "Study_Material" && files[`${index}`].size > 3 * 1024 * 1024) {
                    console.error("file too large", files[`${index}`].name);
                    reject(new Error("File size exceeds the limit of 3 MB"));
                } else if (topic === "Study_Material" && files[`${index}`].size > 3 * 1024 * 1024) {
                    console.error("file too large", files[`${index}`].name);
                    reject(new Error("File size exceeds the limit of 3 MB"));
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

        let createdBy = auth.name
        try {
            let response = await axiosPrivate.post(`/create/${topic.toLowerCase()}`, { ...data, previewSource, createdBy }, {
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
                {topic === "New_Camp" &&
                    <>
                        <label htmlFor={`${topic}_startDate`} >Camp Start Date:</label>
                        <input type="date" id={`${topic}_startDate`} {...register(`${topic}_startDate`)}></input>
                        {faultyInput === `${topic}_startDate` && <p className='errorMessage'>{inputError}</p>}
                        <label htmlFor={`${topic}_endDate`} >Camp End Date:</label>
                        <input type="date" id={`${topic}_endDate`} {...register(`${topic}_endDate`)}></input>
                        {faultyInput === `${topic}_endDate` && <p className='errorMessage'>{inputError}</p>}
                        <label htmlFor={`${topic}_location`} >Camp Location:</label>
                        <input type="text" id={`${topic}_location`} {...register(`${topic}_location`)}></input>
                        {faultyInput === `${topic}_location` && <p className='errorMessage'>{inputError}</p>}
                    </>
                }

                <label htmlFor={`${topic}_description`} >{topic} description:</label>
                <textarea name="" id={`${topic}_description`} cols="30" rows="6" {...register(`${topic}_description`)}></textarea>
                {faultyInput === `${topic}_description` && <p className='errorMessage'>{inputError}</p>}
                {topic === "Study_Material" &&
                    <>
                        <label htmlFor="nccWing">Select Wing:</label>
                        <select id='nccWing'  {...register("nccWing")}>
                            <option value="All">All</option>
                            <option value="Navy">Navy</option>
                            <option value="Air">Air</option>
                            <option value="Army">Army</option>
                        </select>
                    </>
                }
                {topic !== "New_Camp" &&
                    <>
                        <label htmlFor={`${topic}_file`}>Upload {topic !== "Study_Material" ? 'images' : 'files'}:</label>
                        <input type="file" id={`${topic}_file`} multiple onChange={handleFileChange} />
                    </>
                }
                {!isValidFile && <p className='errorMessage'>{invalidFileError}</p>}
                {isValidFile && topic !== "New_Camp" && <p className='errorMessage'>Note: You can upload {topic !== "Study_Material" ? 'images' : 'files'} of total {topic !== "Study_Material" ? '3' : '3'}mb</p>}
                {topic !== "Study_Material" &&
                    <section className='previewImagesContainer'>
                        {previewSource.length > 0 && previewSource.map((source, index) =>
                            <img key={index} src={source} className='previewImage' />
                        )}
                    </section>
                }
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