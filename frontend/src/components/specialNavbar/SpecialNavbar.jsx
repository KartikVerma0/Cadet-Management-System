import { useState } from 'react'
import Model from '../modelComponent/Model'
import './SpecialNavbar.css'
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom'
import permissionsMapping from '../../permissionsMapping';


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
                    permissions.includes(permissionsMapping.canApprovePendingExcuses)
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
                        </section>
                        {selectedButton !== "" && <Model closeButtonHandler={setSelectedButton} topic={selectedButton} />}
                    </>
                    : '' : ''}
        </>

    )
}