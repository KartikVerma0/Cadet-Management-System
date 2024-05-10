import "./SignUpForm.css";
import Joi from "joi";
import PropTypes from "prop-types";
import axios from "../../api/axios.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

/**
 * Schema for sign up form data
 * @type {Object}
 * @property {string} name - User's full name (required).
 * @property {number} mobileNumber - User's 10-digit mobile number (required).
 * @property {string} email - User's email address (required, must be a valid email format without top-level domains).
 * @property {Date} dob - User's date of birth (required).
 * @property {string} [nationality] - User's nationality (optional).
 * @property {string} [fatherName] - User's father's name (optional).
 * @property {string} [motherName] - User's mother's name (optional).
 * @property {string} [address] - User's residential address (optional).
 * @property {string} [bloodGroup] - User's blood group (optional).
 * @property {string} gender - User's gender ("M" or "F", required).
 * @property {string} [nearestRailwayStation] - Nearest railway station to User's residence (optional).
 * @property {string} [nearestPoliceStation] - Nearest police station to User's residence (optional).
 * @property {string} [identificationMark1] - User's identification mark 1 (optional).
 * @property {string} [identificationMark2] - User's identification mark 2 (optional).
 * @property {string} [department] - User's academic department (optional).
 * @property {number} [rollNumber] - User's roll number (optional).
 * @property {number} [academicYear] - User's academic year (1-4, optional).
 * @property {string} [nccUnit] - User's NCC unit (optional).
 * @property {string} enrollmentNumber - User's unique enrollment number (required).
 * @property {string} nccWing - User's NCC wing (required).
 * @property {string} password - User's chosen password (required).
 */
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


/**
 * React component for cadet sign-up form.
 *
 * @param {string} role - The role of the cadet signing up ("CADET", "ANO_CTO", or "PROBATION").
 * @returns {JSX.Element} The sign-up form component.
 */
export default function SignUpForm({ role }) {
    // State variables for form data, errors, and validation
    const [password, setPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")
    const [faultyInput, setFaultyInput] = useState("")
    const [inputError, setInputError] = useState("")
    const [errorLogin, setErrorLogin] = useState(false)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    // Functions for form handling and validation
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

        // Check for unique email
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

        // Validate password match
        if (password !== cnfPassword) return;

        // Validate form data using Joi schema
        try {
            await SignUpFormSchema.validateAsync(data)

        } catch (e) {
            console.error("Invalid input data :", e.message)
            setFaultyInput(e.message.split("\"")[1])
            setInputError(e.message);
            return;
        }

        // Send sign-up request to server
        try {
            let response = await axios.post(`/signup/${role}`, data)
            if (response.data.success) {
                navigate(`/login/${role}`)
                setErrorLogin(false)
            } else {
                console.error(response.data.message)
                setErrorLogin(true)
            }
        } catch (e) {
            console.log(e)
            setErrorLogin(true)
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
                    <label htmlFor="dob">Date of Birth (MM/DD/YYYY)<span className='asterisk'>*</span></label>
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
                {errorLogin && <p className='errorMessage'>Sign Up Failed!</p>}
            </form>
        </div>
    )
}

SignUpForm.propTypes = {
    role: PropTypes.string.isRequired,
}