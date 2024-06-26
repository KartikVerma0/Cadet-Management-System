import "./AuthForm.css";
import PropTypes from "prop-types";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useSpinner from "../../hooks/useSpinner.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { spinner } from "../../hooks/useSpinner.jsx";

export default function AuthForm({ role, authType }) {
    const { register, handleSubmit } = useForm()
    const [errMsg, setErrMsg] = useState('')
    const { setAuth } = useAuth()

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/dashboard"

    const submitHandler = async (data) => {
        setErrMsg('')
        showSpinner()
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_STRING}/login/${role}`, data, {
                withCredentials: true
            })
            if (response.data.success) {
                const accessToken = response.data.accessToken
                const info = {
                    id: response.data.additionalInfo.id,
                    name: response.data.additionalInfo.name,
                    mobileNumber: response.data.additionalInfo.mobileNumber,
                    email: response.data.additionalInfo.email,
                    nccWing: response.data.additionalInfo.nccWing,
                    enrollmentNumber: response.data.additionalInfo.enrollmentNumber,
                    permissions: response.data.additionalInfo.permissions,
                    accountApproved: response.data.additionalInfo.accountApproved,
                    address: response.data.additionalInfo.address,
                    gender: response.data.additionalInfo.gender, department: response.data.additionalInfo.department,
                    rollNumber: response.data.additionalInfo.rollNumber, academicYear: response.data.additionalInfo.academicYear,
                    role: response.data.additionalInfo.role
                }
                //const roles = response.data.roles
                //add roles in setAuth later
                setAuth({ ...info, accessToken })
                setErrMsg('')
                hideSpinner()
                navigate(from, { replace: true })
            } else {
                setErrMsg(response.data.message)
                hideSpinner()
            }
        } catch (err) {
            setErrMsg(err.message)
            hideSpinner()
        }

    }
    return (
        <div className="AuthForm">
            <h1 className='authFormTitle'>{authType.toUpperCase()} ({role.toUpperCase()})</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor="email">Email ID</label>
                    <input type="email" required id='email' {...register("email")} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" required id='password' {...register("password")} />
                </div>
                <button type='submit'>{spinnerVisible ? spinner("rgba(172, 57, 70, 1)") : authType.toUpperCase()}</button>
            </form>
            {errMsg && <p className='errorMessage font-red'>{errMsg.toString()}</p>}
        </div>
    )
}

AuthForm.propTypes = {
    role: PropTypes.string.isRequired,
    authType: PropTypes.string.isRequired
}