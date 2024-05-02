import { useForm } from 'react-hook-form'
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth.js';
import CloseIcon from '@mui/icons-material/Close';
import MessageModal from '../messageModal/MessageModal.jsx';

//spinner component related imports
import { spinner } from '../../hooks/useSpinner.jsx'
import useSpinner from '../../hooks/useSpinner.jsx'

import Joi from 'joi'

import './ExcuseModel.css'

export default function ExcuseModel({ closeButtonHandler, isExcuseSubmitted, setResponse, eventId }) {

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const [faultyInput, setFaultyInput] = useState("")
    const [inputError, setInputError] = useState("")
    const [successSubmit, setSuccessSubmit] = useState(false)
    const [errorSubmit, setErrorSubmit] = useState(false)
    const { register, handleSubmit } = useForm()

    const [isValidFile, setIsValidFile] = useState(true)
    const [invalidFileError, setInvalidFileError] = useState('')
    const [previewSource, setPreviewSource] = useState([])

    const handleValidFileInput = (files) => {

        const isValidPromise = new Promise((resolve, reject) => {
            const keys = Object.keys(files)
            if (keys.length > 1) {
                reject(new Error("Maximum file upload limit is 1"))
            }
            for (let index = 0; index < keys.length; index++) {
                if (files[`${index}`].size > 10 * 1024 * 1024) {
                    console.log("file too large", files[`${index}`].name);
                    reject(new Error("File size exceeds the limit of 10 MB"));
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

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    let ExcuseSchema = Joi.object({
        "Excuse_description": Joi.string().required(),
        "reasonCategory": Joi.string().required()
    })


    const submitHandler = async (data) => {
        showSpinner()
        setFaultyInput("")
        setInputError("")
        setSuccessSubmit(false)
        setErrorSubmit(false)
        try {
            await ExcuseSchema.validateAsync(data)

        } catch (e) {
            console.error("Invalid input data :", e.message)
            setFaultyInput(e.message.split("\"")[1])
            setInputError(e.message);
            hideSpinner()
            return;
        }

        let createdBy = auth.name
        try {
            let response = await axiosPrivate.post(`/create/excuse`, { ...data, previewSource, createdBy, eventId, userEmail: auth.email, role: auth.role, nccWing: auth.nccWing }, {
                headers: {
                    Authorization: `BEARER ${auth.accessToken}`
                },
                withCredentials: true
            })
            if (response.data.success) {
                setTimeout(() => {
                    closeButtonHandler(false)
                }, 2800)
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

        hideSpinner()
        setResponse('')
        isExcuseSubmitted(true)
    }

    return (
        <div className='ExcuseModel'>

            <h3>Post your reason</h3>

            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="reasonCategory">Select Reason: <span className='font-red'>*</span></label>
                <select id='reasonCategory'  {...register("reasonCategory")}>
                    <option value="Medical">Medical Reason</option>
                    <option value="Exam">Exam</option>
                    <option value="Camp">Camp</option>
                    <option value="Other">Other</option>
                </select>
                <label htmlFor={'Excuse_description'} >Excuse description: <span className='font-red'>*</span></label>
                <textarea name="" id='Excuse_description' cols="30" rows="6" {...register('Excuse_description')}></textarea>
                {faultyInput === 'Excuse_description' && <p className='errorMessage'>{inputError}</p>}
                <label htmlFor={`Excuse_file`}>Upload proof:</label>
                <input type="file" id={`Excuse_file`} onChange={handleFileChange} />
                {!isValidFile && <p className='errorMessage'>{invalidFileError}</p>}
                {isValidFile && <p className='errorMessage'>Note: You can upload files of total maximum 10mb</p>}

                <button>{spinnerVisible ? spinner("rgba(150, 100, 0, 1)") : 'Submit'}</button>
            </form>
            {/* {successSubmit && <p className='successMessage'>Successfull Submition!</p>} */}
            {successSubmit && <MessageModal closeButtonHandler={setSuccessSubmit} message='Excuse response saved. Wait for approval!' hasError={false} />}
            {/* if success submit then open message model */}
            {errorSubmit && <p className='errorMessage'>Failed Submition!</p>}
            <button onClick={() => { closeButtonHandler(false) }}><CloseIcon /></button>

        </div>
    )
}