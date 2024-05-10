import "./ProfileInfoForm.css";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useSpinner from "../../hooks/useSpinner.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { spinner } from "../../hooks/useSpinner.jsx";

/**
 * React component for editing user profile information.
 *
 * Displays user profile details and allows editing of specific fields based on user role.
 * Handles form submission for updating profile information and provides visual feedback (spinner) during submission.
 *
 * @param {object} userData - User data object containing profile details.
 * @param {func} setErrMsg - Function to set error message state.
 * @returns {JSX.Element} The profile information form component.
 */
const ProfileInfoForm = ({ userData, setErrMsg }) => {
    const { register, handleSubmit } = useForm() // Form hook from react-hook-form
    const { auth, setAuth } = useAuth() // User authentication state and setter
    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner() // Custom hook for spinner
    const [isEditable, setIsEditable] = useState(false) // Flag for profile edit mode
    const axiosPrivate = useAxiosPrivate() // Custom hook for authenticated API calls


    /**
     * Updates the auth state with edited profile information.
     *
     * @param {object} data - The edited profile data.
     */
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

    /**
   * Handles form submission for profile edit.
   *
   * @param {object} data - The submitted form data.
   * @returns {Promise<void>}
   */
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
        <form className='ProfileInfoForm' onSubmit={handleSubmit(submitHandler)}>
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
                        <input type="text" id='enrollmentNumber' className={isEditable ? 'editableInput' : ''} disabled={!isEditable} defaultValue={auth.enrollmentNumber.toUpperCase()} {...register("enrollmentNumber")} />
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
    );
};
export default ProfileInfoForm;


ProfileInfoForm.propTypes = {
    userData: PropTypes.object,
    setErrMsg: PropTypes.func
}