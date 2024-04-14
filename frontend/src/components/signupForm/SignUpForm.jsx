import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import "./SignUpForm.css"
import { useState } from 'react'

export default function SignUpForm({ role }) {
    const [password, setPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()

    const passwordStateChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    const confirmPasswordStateChangeHandler = (e) => {
        setCnfPassword(e.target.value)
    }

    const submitHandler = (data) => {
        if (password !== cnfPassword) return;
        alert(JSON.stringify(data))

        // add logic for form submission here
    }
    return (
        <div className="SignUpForm">
            <h1 className='signUpFormTitle'>SIGN UP ({role.toUpperCase()})</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                {/* Make necessary inputs required */}

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' {...register("name")} />
                </div>

                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="nationality">Nationality</label>
                        <input type="text" id='nationality' {...register("nationality")} />
                    </div>
                }
                <div>
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id='dob' {...register("dob")} />
                </div>

                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="fatherName">Father&apos;s / Guardian&apos;s Name</label>
                        <input type="text" id='fatherName' {...register("fatherName")} />
                    </div>
                }

                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="motherName">Mother&apos;s Name</label>
                        <input type="text" id='motherName' {...register("motherName")} />
                    </div>
                }

                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="address">Residential Address</label>
                        <textarea name="" id="address" placeholder='(Landmark, State, Distt/Taluka, City/Vill, Pin Code)' cols="30" rows="8" {...register("address")}></textarea>
                    </div>
                }

                <div>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input type="number" id='mobileNumber' {...register("mobileNumber")} />
                </div>
                <div>
                    <label htmlFor="email">Email ID</label>
                    <input type="email" id='email' {...register("email")} />
                </div>

                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <input type="text" id='bloodGroup' {...register("bloodGroup")} />
                    </div>
                }

                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <input type="text" id='gender' {...register("gender")} />
                    </div>
                }

                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="nearestRailwayStation">Nearest Railway Station</label>
                        <input type="text" id='nearestRailwayStation' {...register("nearestRailwayStation")} />
                    </div>
                }
                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="nearestPoliceStation">Nearest Police Station</label>
                        <input type="text" id='nearestPoliceStation' {...register("nearestPoliceStation")} />
                    </div>
                }
                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="identificationMark1">Identification Mark (at least two)</label>
                        <input type="text" id='identificationMark1' {...register("identificationMark1")} />
                        <input type="text" id='identificationMark2' {...register("identificationMark2")} />
                    </div>
                }

                {role === "CADET" &&
                    <div>
                        <label htmlFor="nccUnit">NCC Unit</label>
                        <input type="text" id='nccUnit' {...register("nccUnit")} />
                    </div>
                }
                <div>
                    <label htmlFor="nccWing">NCC Wing</label>
                    <input type="text" id='nccWing' {...register("nccWing")} />
                </div>

                {role === "CADET" &&
                    <div>
                        <label htmlFor="enrollmentNumber">Enrollment Number</label>
                        <input type="text" id='enrollmentNumber' {...register("enrollmentNumber")} />
                    </div>
                }



                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="department">Univeristy Department</label>
                        <input type="text" id='department' {...register("department")} />
                    </div>
                }
                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="rollNumber">University Roll Number</label>
                        <input type="text" id='rollNumber' {...register("rollNumber")} />
                    </div>
                }
                {role !== "ANO_CTO" &&
                    <div>
                        <label htmlFor="academicYear">Academic Year</label>
                        <input type="text" id='academicYear' {...register("academicYear")} />
                    </div>
                }
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' {...register("password")} onChange={passwordStateChangeHandler} />
                </div>
                <div>
                    <label htmlFor="cnfPassword">Confirm Password</label>
                    <input type="text" id='cnfPassword' {...register("cnfPassword")} onChange={confirmPasswordStateChangeHandler} />
                    {password !== cnfPassword && <p className='equalPasswordMessage'>Passwords do not Match!</p>}
                </div>
                <button type='submit'>SIGN UP</button>
            </form>
        </div>
    )
}

SignUpForm.propTypes = {
    role: PropTypes.string.isRequired,
}