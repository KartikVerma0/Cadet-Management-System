import { useForm } from 'react-hook-form'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { BACKEND_BASE_STRING } from '../../env'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'

import PropTypes from 'prop-types'
import "./AuthForm.css"

export default function AuthForm({ role, authType }) {
    const { register, handleSubmit } = useForm()
    const [errMsg, setErrMsg] = useState('')
    const [successLogin, setSuccessLogin] = useState(false)
    const { setAuth } = useContext(AuthContext);
    const submitHandler = async (data) => {

        try {
            const response = await axios.post(`${BACKEND_BASE_STRING}/login/${role}`, data, {
                withCredentials: true
            })
            if (response.data.success) {
                const accessToken = response.data.accessToken
                // console.log(accessToken)
                //const roles = response.data.roles
                //add roles in setAuth later
                setAuth({ ...data, accessToken })
                setSuccessLogin(true)
                setErrMsg('')
            } else {
                setErrMsg(response.data.message)
                setSuccessLogin(false)
            }
        } catch (err) {
            setErrMsg(err.message)
            setSuccessLogin(false)
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
                <button type='submit'>{authType.toUpperCase()}</button>
            </form>
            {errMsg && <p className='errorMessage font-red'>{errMsg.toString()}</p>}
            {successLogin && <p className='successMessage font-green'>Successfully logged in</p>}
            <Link to="/dashboard">dash</Link>
        </div>
    )
}

AuthForm.propTypes = {
    role: PropTypes.string.isRequired,
    authType: PropTypes.string.isRequired
}