import { useState } from 'react'
import Model from '../modelComponent/Model'
import './SpecialNavbar.css'
import useAuth from '../../hooks/useAuth';
import permissionsMapping from '../../permissionsMapping';


export default function SpecialNavbar() {
    const [selectedButton, setSelectedButton] = useState("");
    const { auth } = useAuth()
    const permissions = auth.permissions
    const canCreateEventCode = permissionsMapping.canCreateEvent
    const canCreatePollCode = permissionsMapping.canCreatePoll
    const canCreateNotificationCode = permissionsMapping.canCreateNotification

    const handleClick = (data) => {
        setSelectedButton(data);
    }

    return (
        <>
            {permissions.length ? permissions.includes(canCreateEventCode) || permissions.includes(canCreatePollCode) || permissions.includes(canCreateNotificationCode) ?
                <>
                    <section className='SpecialNavbar'>
                        {permissions.length ? permissions.includes(canCreateEventCode) ? <button to="/create/event" onClick={() => handleClick("Event")}>Create an Event</button> : '' : ''}
                        {permissions.length ? permissions.includes(canCreatePollCode) ? <button to="/create/poll" onClick={() => handleClick("Poll")}>Create a Poll</button> : '' : ''}
                        {permissions.length ? permissions.includes(canCreateNotificationCode) ? <button to="/create/notification" onClick={() => handleClick("Notification")}>Create a Notification</button> : '' : ''}
                    </section>
                    {selectedButton !== "" && <Model closeButtonHandler={setSelectedButton} topic={selectedButton} />}
                </>
                : '' : ''}
        </>

    )
}