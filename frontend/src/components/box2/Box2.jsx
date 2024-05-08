import "./Box2.css";
import PropTypes from "prop-types";
import permissionMapping from "../../permissionsMapping.js";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useSpinner from "../../hooks/useSpinner.jsx";
import { useState } from "react";
import { spinner } from "../../hooks/useSpinner.jsx";

export const Box2 = ({ data }) => {
    const axiosPrivate = useAxiosPrivate()
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { spinnerVisible,
        showSpinner,
        hideSpinner
    } = useSpinner()

    const promoteUser = async (type) => {
        showSpinner()


        try {
            let response = await axiosPrivate.put(`/user/promote`, { cadetId: data._id, type }, {
                headers: {
                    Authorization: `BEARER ${auth.accessToken}`
                },
                withCredentials: true
            })
            if (response.data.success) {
                data.hasSpecialPermissions = true
            } else {
                setHasError(true)
                setErrorMessage(response.data.message)
                console.error(response.data.message)
            }
        } catch (e) {
            console.log(e)
        }
        hideSpinner()
    }

    const demoteUser = async () => {
        showSpinner()
        try {
            let response = await axiosPrivate.put(`/user/demote`, { cadetId: data._id }, {
                headers: {
                    Authorization: `BEARER ${auth.accessToken}`
                },
                withCredentials: true
            })
            if (response.data.success) {
                data.hasSpecialPermissions = false
            } else {
                setHasError(true)
                setErrorMessage(response.data.message)
                console.error(response.data.message)
            }
        } catch (e) {
            console.log(e)
        }
        hideSpinner()
    }

    const { auth } = useAuth()
    return (
        <div className="Box2">
            <span>{data.name}</span>
            <span>{data.nccWing}</span>
            <span>{data.enrollmentNumber}</span>
            {data.hasSpecialPermissions ?
                <button className="demoteBtn" onClick={demoteUser}>{spinnerVisible ? spinner("rgba(150, 100, 0, 1)") : 'Demote'}</button> :
                auth.permissions.includes(permissionMapping.canAuthorizeWingSenior) ?
                    <button className="promoteBtn" onClick={() => promoteUser('wing')}>{spinnerVisible ? spinner("rgba(150, 100, 0, 1)") : 'Promote to Wing Senior'}</button> :
                    auth.permissions.includes(permissionMapping.canAuthorizeProbationSenior) ?
                        <button className="promoteBtn" onClick={() => promoteUser('probation')}>{spinnerVisible ? spinner("rgba(150, 100, 0, 1)") : 'Promote to Probation Senior'}</button> :
                        ''
            }
            {hasError ? <p className="errorMessage">{errorMessage}</p> : ''}
        </div>
    );
};

Box2.propTypes = {
    data: PropTypes.object
}
