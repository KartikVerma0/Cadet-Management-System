import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import "./SignUpForm.css"
import { useState } from 'react'
import axios from '../../api/axios.js'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'

const SignUpFormSchema = Joi.object({
    name: Joi.string().required(),
    mobileNumber: Joi.number()
        .required()
        .min(1000000000)
        .max(9999999999),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    dob: Joi.date().required(),
    nationality: Joi.string(),
    fatherName: Joi.string(),
    motherName: Joi.string(),
    address: Joi.string(),
    bloodGroup: Joi.string(),
    gender: Joi.string()
        .pattern(/^M$|^F$/),
    nearestRailwayStation: Joi.string(),
    nearestPoliceStation: Joi.string(),
    identificationMark1: Joi.string(),
    identificationMark2: Joi.string(),
    department: Joi.string(),
    rollNumber: Joi.number(),
    academicYear: Joi.number()
        .min(1)
        .max(4),
    nccUnit: Joi.string(),
    enrollmentNumber: Joi.string(),
    nccWing: Joi.string().required(),
    password: Joi.string().required()
})

export default function SignUpForm({ role }) {
    const [password, setPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")
    const [faultyInput, setFaultyInput] = useState("")
    const [inputError, setInputError] = useState("")
    const [successLogin, setSuccessLogin] = useState(false)
    const [errorLogin, setErrorLogin] = useState(false)
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    const passwordStateChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    const confirmPasswordStateChangeHandler = (e) => {
        setCnfPassword(e.target.value)
    }

    const checkUniqueEmail = async (email) => {
        const response = await axios.get(`/check?email=${email}`)
        return response.data
    }

    const submitHandler = async (data) => {
        setFaultyInput("")
        setInputError("")
        try {
            const response = await checkUniqueEmail(data.email)
            if (!response.success) {
                console.error(response.message)
                setFaultyInput('email')
                setInputError("Enter a unique email ID");
                return
            }
        } catch (err) {
            console.error(err)
            setFaultyInput('email')
            setInputError("Enter a unique email ID");
            return
        }

        if (password !== cnfPassword) return;
        try {
            await SignUpFormSchema.validateAsync(data)

        } catch (e) {
            console.error("Invalid input data :", e.message)
            setFaultyInput(e.message.split("\"")[1])
            setInputError(e.message);
            return;
        }

        try {
            let response = await axios.post(`/signup/${role}`, data)
            if (response.data.success) {
                navigate(`/login/${role}`)
                setSuccessLogin(true)
                setErrorLogin(false)
            } else {
                console.error(response.data.message)
                setErrorLogin(true)
                setSuccessLogin(false)
            }
        } catch (e) {
            console.log(e)
            setErrorLogin(true)
            setSuccessLogin(false)
        }
    }
    return (
        <div className="SignUpForm">
            <h1 className='signUpFormTitle'>SIGN UP ({role.toUpperCase()})</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor="name">Name <span className='asterisk'>*</span></label>
                    <input type="text" id='name' {...register("name")} />
                    {faultyInput === "name" && <p className='errorMessage'>{inputError}</p>}
                </div>

                <div>
                    <label htmlFor="mobileNumber">Mobile Number <span className='asterisk'>*</span></label>
                    <input type="number" id='mobileNumber' {...register("mobileNumber")} />
                    {faultyInput === "mobileNumber" && <p className='errorMessage'>{inputError}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email ID <span className='asterisk'>*</span></label>
                    <input type="email" id='email' {...register("email")} />
                    {faultyInput === "email" && <p className='errorMessage'>{inputError}</p>}
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth <span className='asterisk'>*</span></label>
                    <input type="date" id='dob' {...register("dob")} />
                    {faultyInput === "dob" && <p className='errorMessage'>{inputError}</p>}
                </div>

                {role !== "ANO_CTO" &&
                    <>
                        <div>
                            <label htmlFor="nationality">Nationality <span className='asterisk'>*</span></label>
                            <input type="text" id='nationality' {...register("nationality")} />
                            {faultyInput === "nationality" && <p className='errorMessage'>{inputError}</p>}
                        </div>

                        <div>
                            <label htmlFor="fatherName">Father&apos;s / Guardian&apos;s Name <span className='asterisk'>*</span></label>
                            <input type="text" id='fatherName' {...register("fatherName")} />
                            {faultyInput === "fatherName" && <p className='errorMessage'>{inputError}</p>}
                        </div>
                        <div>
                            <label htmlFor="motherName">Mother&apos;s Name <span className='asterisk'>*</span></label>
                            <input type="text" id='motherName' {...register("motherName")} />
                            {faultyInput === "motherName" && <p className='errorMessage'>{inputError}</p>}
                        </div>
                        <div>
                            <label htmlFor="address">Residential Address <span className='asterisk'>*</span></label>
                            <textarea name="" id="address" placeholder='(Landmark, State, Distt/Taluka, City/Vill, Pin Code)' cols="30" rows="8" {...register("address")}></textarea>
                            {faultyInput === "address" && <p className='errorMessage'>{inputError}</p>}
                        </div>

                        <div>
                            <label htmlFor="bloodGroup">Blood Group <span className='asterisk'>*</span></label>
                            <input type="text" id='bloodGroup' {...register("bloodGroup")} />
                            {faultyInput === "bloodGroup" && <p className='errorMessage'>{inputError}</p>}
                        </div>

                        <div>
                            <label htmlFor="gender">Gender <span className='asterisk'>*</span></label>
                            <select id='gender' {...register("gender")}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                            {/* <input type="text" id='gender' {...register("gender")} /> */}
                            {faultyInput === "gender" && <p className='errorMessage'>{inputError}</p>}
                        </div>

                        <div>
                            <label htmlFor="nearestRailwayStation">Nearest Railway Station <span className='asterisk'>*</span></label>
                            <input type="text" id='nearestRailwayStation' {...register("nearestRailwayStation")} />
                            {faultyInput === "nearestRailwayStation" && <p className='errorMessage'>{inputError}</p>}
                        </div>

                        <div>
                            <label htmlFor="nearestPoliceStation">Nearest Police Station <span className='asterisk'>*</span></label>
                            <input type="text" id='nearestPoliceStation' {...register("nearestPoliceStation")} />
                            {faultyInput === "nearestPoliceStation" && <p className='errorMessage'>{inputError}</p>}
                        </div>

                        <div>
                            <label htmlFor="identificationMark1">Identification Mark (at least two) <span className='asterisk'>*</span></label>
                            <input type="text" id='identificationMark1' {...register("identificationMark1")} />
                            {faultyInput === "identificationMark1" && <p className='errorMessage'>{inputError}</p>}
                            <input type="text" id='identificationMark2' {...register("identificationMark2")} />
                            {faultyInput === "identificationMark2" && <p className='errorMessage'>{inputError}</p>}
                        </div>
                        <div>
                            <label htmlFor="department">Univeristy Department <span className='asterisk'>*</span></label>
                            <input type="text" id='department' {...register("department")} />
                            {faultyInput === "department" && <p className='errorMessage'>{inputError}</p>}
                        </div>
                        <div>
                            <label htmlFor="rollNumber">University Roll Number <span className='asterisk'>*</span></label>
                            <input type="text" id='rollNumber' {...register("rollNumber")} />
                            {faultyInput === "rollNumber" && <p className='errorMessage'>{inputError}</p>}
                        </div>
                        <div>
                            <label htmlFor="academicYear">Academic Year <span className='asterisk'>*</span></label>
                            <select id='academicYear' {...register("academicYear")}>
                                <option value="1">1st</option>
                                <option value="2">2nd</option>
                                {role !== "PROBATION" &&
                                    <>
                                        <option value="3">3rd</option>
                                        <option value="4">4th</option>
                                    </>
                                }
                            </select>
                            {/* <input type="text" id='academicYear' {...register("academicYear")} /> */}
                            {faultyInput === "academicYear" && <p className='errorMessage'>{inputError}</p>}
                        </div>
                    </>
                }

                {role === "CADET" &&
                    <>
                        <div>
                            <label htmlFor="nccUnit">NCC Unit <span className='asterisk'>*</span></label>
                            <select id='nccUnit' {...register("nccUnit")}>
                                <option value="1 pb nu ncc">1 PB NU NCC, NAYA NANGAL</option>
                                <option value="5 pb ncc">5 PB NCC, PATIALA</option>
                                <option value="3 pb air squadron ncc">3 PB AIR SQUADRON NCC, PATIALA</option>
                            </select>
                            {faultyInput === "nccUnit" && <p className='errorMessage'>{inputError}</p>}
                        </div>

                        <div>
                            <label htmlFor="enrollmentNumber">Enrollment Number <span className='asterisk'>*</span></label>
                            <input type="text" id='enrollmentNumber' {...register("enrollmentNumber")} />
                            {faultyInput === "enrollmentNumber" && <p className='errorMessage'>{inputError}</p>}
                        </div>
                    </>
                }
                <div>
                    <label htmlFor="nccWing">NCC Wing <span className='asterisk'>*</span></label>
                    <select id='nccWing' {...register("nccWing")}>
                        <option value="Navy">Navy</option>
                        <option value="Air">Air</option>
                        <option value="Army">Army</option>
                    </select>
                    {/* <input type="text" id='nccWing' {...register("nccWing")} /> */}
                    {faultyInput === "nccWing" && <p className='errorMessage'>{inputError}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password <span className='asterisk'>*</span></label>
                    <input type="password" id='password' {...register("password")} onChange={passwordStateChangeHandler} />
                    {faultyInput === "password" && <p className='errorMessage'>{inputError}</p>}
                </div>
                <div>
                    <label htmlFor="cnfPassword">Confirm Password <span className='asterisk'>*</span></label>
                    <input type="text" id='cnfPassword' onChange={confirmPasswordStateChangeHandler} />
                    {password !== cnfPassword && <p className='errorMessage'>Passwords do not Match!</p>}
                </div>
                <button type='submit'>SIGN UP</button>
                {successLogin && <p className='successMessage'>Sign Up Successfull!</p>}
                {errorLogin && <p className='errorMessage'>Sign Up Failed!</p>}
            </form>
        </div>
    )
}

SignUpForm.propTypes = {
    role: PropTypes.string.isRequired,
}