import "./SettingsPage.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import useAuth from "../../hooks/useAuth.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useSpinner from "../../hooks/useSpinner.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { spinner } from "../../hooks/useSpinner.jsx";

export default function SettingsPage() {
    const axiosPrivate = useAxiosPrivate()
    const [activeSection, setActiveSection] = useState('security');
    const { auth } = useAuth()
    const { register, handleSubmit } = useForm()

    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()


    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")

    const oldPasswordStateChangeHandler = (e) => {
        setOldPassword(e.target.value)
    }
    const newPasswordStateChangeHandler = (e) => {
        setNewPassword(e.target.value)
    }
    const confirmPasswordStateChangeHandler = (e) => {
        setCnfPassword(e.target.value)
    }

    const submitHandler = async () => {
        setErrMsg('')
        setSuccessMsg('')
        if (oldPassword === '' || newPassword === '' || cnfPassword === '') return;
        if (newPassword === oldPassword) return;
        if (newPassword !== cnfPassword) return;
        showSpinner()
        const role = auth.role
        try {
            const response = await axiosPrivate.post(`/user/changePwd`, { oldPassword, newPassword, role }, {
                headers: {
                    Authorization: `BEARER ${auth.accessToken}`
                },
                withCredentials: true
            })
            if (response.data.success) {
                setErrMsg('')
                setSuccessMsg(response.data.message)
                hideSpinner()
            } else {
                setSuccessMsg('')
                setErrMsg(response.data.message)
                hideSpinner()
            }
        } catch (err) {
            setSuccessMsg('')
            setErrMsg(err.message)
            hideSpinner()
        }
    }

    const [activeInput, setActiveInput] = useState()

    return (
        <div className='SettingsPage'>
            <Navbar loginType='logout' />

            <main>
                <div className="leftside">
                    <span className={activeSection === 'security' ? 'activeIcon' : ''} onClick={() => setActiveSection('security')}><SecurityOutlinedIcon /><p>Security</p></span>
                </div>
                <div className="rightside">
                    {activeSection === 'security' &&
                        <>
                            <h1>Security</h1>
                            <h2>Change Password</h2>
                            <form className='securityForm' onSubmit={handleSubmit(submitHandler)}>
                                <section>
                                    <div>
                                        <label htmlFor="oldPasswd">Old Password:</label>
                                        <input
                                            type="password"
                                            id='oldPasswd'
                                            {...register('old')}
                                            className={activeInput === 'oldPwd' ? 'activeInput' : ''}
                                            onClick={(e) => { setActiveInput(e.target.id) }}
                                            onBlur={() => { setActiveInput() }}
                                            onChange={oldPasswordStateChangeHandler}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="newPwd">New Password:</label>
                                        <input
                                            type="password"
                                            id='newPwd'
                                            {...register('new')}
                                            className={activeInput === 'newPwd' ? 'activeInput' : ''}
                                            onClick={(e) => { setActiveInput(e.target.id) }}
                                            onBlur={() => { setActiveInput() }}
                                            onChange={newPasswordStateChangeHandler}
                                        />
                                    </div>
                                    {newPassword === oldPassword && newPassword !== '' && <p className='errorMessage'>New Password should be different from old password!</p>}
                                    <div>
                                        <label htmlFor="cnfNewPwd">Confirm new Password:</label>
                                        <input
                                            type="text"
                                            id='cnfNewPwd'
                                            className={activeInput === 'cnfNewPwd' ? 'activeInput' : ''}
                                            onClick={(e) => { setActiveInput(e.target.id) }}
                                            onBlur={() => { setActiveInput() }}
                                            onChange={confirmPasswordStateChangeHandler}
                                        />
                                    </div>
                                    {newPassword !== cnfPassword && <p className='errorMessage'>Passwords do not Match!</p>}
                                </section>
                                <button className='formBtn'>{spinnerVisible ? spinner("rgba(172, 57, 70, 1)") : 'Submit'}</button>
                            </form>
                            {errMsg && <p className='font-red'>{errMsg.toString()}</p>}
                            {successMsg && <p className='font-green'>{successMsg.toString()}</p>}
                        </>
                    }
                </div>
            </main >
        </div >
    )
}