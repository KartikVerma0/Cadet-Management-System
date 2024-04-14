import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import "./AuthForm.css"

export default function AuthForm({ role, authType }) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const submitHandler = (data) => {
        alert(JSON.stringify(data))
        // add logic for form submission here
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
        </div>
    )
}

AuthForm.propTypes = {
    role: PropTypes.string.isRequired,
    authType: PropTypes.string.isRequired
}