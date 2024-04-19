import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import axios from 'axios'
import Joi from 'joi'
import { BACKEND_BASE_STRING } from '../../env'


import "./Model.css"


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

    const submitHandler = async (data) => {
        try {
            await ModelSchema.validateAsync(data)

        } catch (e) {
            console.error("Invalid input data :", e.message)
            setFaultyInput(e.message.split("\"")[1])
            setInputError(e.message);
            return;
        }
        setFaultyInput("")
        setInputError("")
        try {
            let response = await axios.post(`${BACKEND_BASE_STRING}/create/${topic.toLowerCase()}`, data)
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
                <textarea name="" id={`${topic}_description`} cols="30" rows="10" {...register(`${topic}_description`)}></textarea>
                {faultyInput === `${topic}_description` && <p className='errorMessage'>{inputError}</p>}
                <button>Submit</button>
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