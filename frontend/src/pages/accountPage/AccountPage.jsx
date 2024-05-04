import "./AccountPage.css";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FeedbackForm from "../../components/feedbackForm/FeedbackForm.jsx";
import Navbar from "../../components/navbar/Navbar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useSpinner from "../../hooks/useSpinner.jsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { spinner } from "../../hooks/useSpinner.jsx";

//spinner component related imports

export default function AccountPage() {
    const axiosPrivate = useAxiosPrivate()
    const [activeSection, setActiveSection] = useState('profile');
    const [userData, setUserData] = useState({})
    const { auth, setAuth } = useAuth()
    const { register, handleSubmit } = useForm()


    useEffect(() => {
        const getUserData = async function () {
            try {
                const response = await axiosPrivate.get(`/user?role=${auth.role}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    //formatting dob before setting user data
                    const dob = new Date(response.data.userData.dob)
                    const formattedDate = `${dob.getUTCDate()}-${dob.getUTCMonth() + 1}-${dob.getUTCFullYear()}`;
                    response.data.userData.dob = formattedDate
                    setUserData(response.data.userData)
                } else {
                    throw new Error(response.data.message)
                }
            } catch (err) {
                console.error(err.message)
            }
        }
        getUserData()

    }, [auth.accessToken])

    const [errMsg, setErrMsg] = useState('')
    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const [isEditable, setIsEditable] = useState(false)

    const updateAuthState = (data) => {
        let options = {}
        if (data?.address) {
            options.address = data.address
        }
        if (data?.mobileNumber) {
            options.mobileNumber = data.mobileNumber
        }
        if (data?.enrollmentNumber) {
            options.enrollmentNumber = data.enrollmentNumber
        }
        if (data?.academicYear) {
            options.academicYear = data.academicYear
        }


        setAuth(prevAuth => {
            return {
                ...prevAuth, ...options
            }
        })
    }

    const submitHandler = async (data) => {
        setErrMsg('')
        showSpinner()
        const role = auth.role
        try {
            const response = await axiosPrivate.post(`/user`, { ...data, role }, {
                headers: {
                    Authorization: `BEARER ${auth.accessToken}`
                },
                withCredentials: true
            })
            if (response.data.success) {
                setErrMsg('')
                hideSpinner()
                setIsEditable(false);
                updateAuthState(data)
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
        <div className='AccountPage'>
            <Navbar loginType='logout' />

            <main>
                <div className="leftside">
                    <span className={activeSection === 'profile' ? 'activeIcon' : ''} onClick={() => setActiveSection('profile')}><PersonOutlineIcon /><p>Profile Information</p></span>
                    <span className={activeSection === 'feedback' ? 'activeIcon' : ''} onClick={() => setActiveSection('feedback')}><ChatBubbleOutlineOutlinedIcon /><p>Feedback</p></span>
                </div>
                <div className="rightside">
                    {activeSection === 'profile' && userData && Object.keys(userData).length > 0 &&
                        <>
                            <h1>Profile Information</h1>
                            <form className='profileForm' onSubmit={handleSubmit(submitHandler)}>
                                <section>
                                    <div>
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" id='name' disabled defaultValue={auth.name.charAt(0).toUpperCase() + auth.name.substring(1)} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id='email' disabled defaultValue={auth.email} />
                                    </div>
                                    {auth.role !== "ANO_CTO"
                                        &&
                                        <div>
                                            <label htmlFor="fatherName">Father&apos;s Name:</label>
                                            <input type="text" id='fatherName' disabled defaultValue={userData.fatherName.charAt(0).toUpperCase() + userData.fatherName.substring(1)} />
                                        </div>
                                    }
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="motherName">Mother&apos;sName:</label>
                                            <input type="text" id='motherName' disabled defaultValue={userData.motherName.charAt(0).toUpperCase() + userData.motherName.substring(1)} />
                                        </div>
                                    }
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="nationality">Nationality:</label>
                                            <input type="text" id='nationality' disabled defaultValue={userData.nationality.charAt(0).toUpperCase() + userData.nationality.substring(1)} />
                                        </div>
                                    }
                                    <div>
                                        <label htmlFor="dob">DOB:</label>
                                        <input type="text" id='dob' disabled defaultValue={userData.dob} />
                                    </div>
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="address">Address:</label>
                                            <input type="text" id='address' className={isEditable ? 'editableInput' : ''} disabled={!isEditable} defaultValue={auth.address} {...register("address")} />
                                        </div>
                                    }
                                    <div>
                                        <label htmlFor="mobileNumber">Mobile Number:</label>
                                        <input type="text" id='mobileNumber' className={isEditable ? 'editableInput' : ''} disabled={!isEditable} defaultValue={auth.mobileNumber} {...register("mobileNumber")} />
                                    </div>
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="bloodGroup">Blood Group:</label>
                                            <input type="text" id='bloodGroup' disabled defaultValue={userData.bloodGroup.toUpperCase()} />
                                        </div>
                                    }
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="gender">Gender:</label>
                                            <input type="text" id='gender' disabled defaultValue={auth.gender} />
                                        </div>
                                    }
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="nearestRailwayStation">Nearest Railway Station:</label>
                                            <input type="text" id='nearestRailwayStation' className={isEditable ? 'editableInput' : ''} disabled={!isEditable} defaultValue={userData.nearestRailwayStation.charAt(0).toUpperCase() + userData.nearestRailwayStation.substring(1)} {...register("nearestRailwayStation")} />
                                        </div>
                                    }
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="nearestPoliceStation">Nearest Police Station:</label>
                                            <input type="text" id='nearestPoliceStation' className={isEditable ? 'editableInput' : ''} disabled={!isEditable} defaultValue={userData.nearestPoliceStation.charAt(0).toUpperCase() + userData.nearestPoliceStation.substring(1)} {...register("nearestPoliceStation")} />
                                        </div>
                                    }
                                </section>
                                <section>
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="identificationMark1">Identification Mark:</label>
                                            <input type="text" id='identificationMark1' disabled defaultValue={userData.identificationMark1} />
                                            <input type="text" id='identificationMark2' disabled defaultValue={userData.identificationMark2} />
                                        </div>
                                    }
                                    <div>
                                        <label htmlFor="nccWing">NCC Wing:</label>
                                        <input type="text" id='nccWing' disabled defaultValue={auth.nccWing} />
                                    </div>
                                    {(auth.role === "CADET") &&
                                        <div>
                                            <label htmlFor="nccUnit">NCC Unit:</label>
                                            <input type="text" id='nccUnit' disabled defaultValue={userData.nccUnit.toUpperCase()} />
                                        </div>
                                    }
                                    {(auth.role === "CADET") &&
                                        <div>
                                            <label htmlFor="enrollmentNumber">Enrollment Number:</label>
                                            <input type="text" id='enrollmentNumber' className={isEditable} disabled={!isEditable} defaultValue={auth.enrollmentNumber.toUpperCase()} {...register("enrollmentNumber")} />
                                        </div>
                                    }
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="department">Department:</label>
                                            <input type="text" id='department' disabled defaultValue={auth.department.toUpperCase()} />
                                        </div>
                                    }
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="rollNumber">Roll No.:</label>
                                            <input type="text" id='rollNumber' disabled defaultValue={auth.rollNumber} />
                                        </div>
                                    }
                                    {auth.role !== "ANO_CTO" &&
                                        <div>
                                            <label htmlFor="academicYear">Academic Year:</label>
                                            <select defaultValue={auth.academicYear} id='academicYear' className={isEditable && auth.role === "CADET" ? 'editableInput' : ''} disabled={!isEditable ? (auth.role === "CADET") ? true : true : false} {...register("academicYear")}>
                                                <option value="1" selected={auth.academicYear === '1'}>1st</option>
                                                <option value="2" selected={auth.academicYear === '2'}>2nd</option>
                                                {auth.role !== "PROBATION" &&
                                                    <>
                                                        <option value="3" selected={auth.academicYear === '3'}>3rd</option>
                                                        <option value="4" selected={auth.academicYear === '4'}>4th</option>
                                                    </>
                                                }
                                            </select>
                                        </div>
                                    }
                                </section>
                                {!isEditable && <button className='formBtn' type='button' onClick={() => setIsEditable(true)}>Edit</button>}
                                {isEditable && <button className='formBtn' type='submit'>{spinnerVisible ? spinner("rgba(172, 57, 70, 1)") : 'Submit'}</button>}
                            </form>
                            {errMsg && <p className='font-red'>{errMsg.toString()}</p>}
                        </>
                    }
                    {activeSection === 'feedback' &&
                        <>
                            <h1>Feedback</h1>
                            <FeedbackForm />
                        </>
                    }
                </div>
            </main >
        </div >
    )
}