import "./SpecialNavbar.css";
import Model from "../modelComponent/Model";
import permissionsMapping from "../../permissionsMapping";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SpecialNavbar() {
    const [selectedButton, setSelectedButton] = useState("");
    const { auth } = useAuth()
    const permissions = auth.permissions

    const handleClick = (data) => {
        setSelectedButton(data);
    }

    return (
        <>
            {permissions.length ?
                permissions.includes(permissionsMapping.canCreateEvent) ||
                    permissions.includes(permissionsMapping.canCreatePollCode) ||
                    permissions.includes(permissionsMapping.canCreateNotificationCode) ||
                    permissions.includes(permissionsMapping.canSeeEnrolledCadets) ||
                    permissions.includes(permissionsMapping.canSeeProbationCadets) ||
                    permissions.includes(permissionsMapping.canUploadStudyMaterial) ||
                    permissions.includes(permissionsMapping.canApprovePendingExcuses) ||
                    permissions.includes(permissionsMapping.canAuthorizeWingSenior) ||
                    permissions.includes(permissionsMapping.canAuthorizeProbationSenior) ||
                    permissions.includes(permissionsMapping.canApproveCadetAccounts)
                    ?
                    <>
                        <section className='SpecialNavbar'>
                            {permissions.includes(permissionsMapping.canCreateEvent) ? <button onClick={() => handleClick("Event")}>Create an Event</button> : ''}
                            {permissions.includes(permissionsMapping.canCreatePoll) ? <button onClick={() => handleClick("Poll")}>Create a Poll</button> : ''}
                            {permissions.includes(permissionsMapping.canCreateNotification) ? <button onClick={() => handleClick("Notification")}>Create a Notification</button> : ''}
                            {permissions.includes(permissionsMapping.canUploadStudyMaterial) ? <button onClick={() => handleClick("Study_Material")}>Upload Study Material</button> : ''}
                            {permissions.includes(permissionsMapping.canSeeEnrolledCadets) ? <Link to="/enrolled/cadets">Enrolled Cadets</Link> : ''}
                            {permissions.includes(permissionsMapping.canSeeProbationCadets) ? <Link to="/enrolled/probation">Probation Cadets</Link> : ''}
                            {permissions.includes(permissionsMapping.canApprovePendingExcuses) ? <Link to="/pendingexcuses">Pending Excuses</Link> : ''}
                            {permissions.includes(permissionsMapping.canAuthorizeWingSenior) ||
                                permissions.includes(permissionsMapping.canAuthorizeProbationSenior) ? <Link to="/authorize">Authorize Cadets</Link> : ''}
                            {permissions.includes(permissionsMapping.canApproveCadetAccounts) ? <Link to={'/approveAccounts'}>Approve Cadet Account</Link> : ''}
                        </section>
                        {selectedButton !== "" && <Model closeButtonHandler={setSelectedButton} topic={selectedButton} />}
                    </>
                    : '' : ''}
        </>

    )
}