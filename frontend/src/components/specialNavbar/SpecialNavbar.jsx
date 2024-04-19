import { useState } from 'react'
import Model from '../modelComponent/Model'
import './SpecialNavbar.css'



export default function SpecialNavbar() {
    const [selectedButton, setSelectedButton] = useState("");

    const handleClick = (data) => {
        setSelectedButton(data);
    }

    return (
        <>
            <section className='SpecialNavbar'>
                <button to="/create/event" onClick={() => handleClick("Event")}>Create an Event</button>
                <button to="/create/poll" onClick={() => handleClick("Poll")}>Create a Poll</button>
                <button to="/create/notification" onClick={() => handleClick("Notification")}>Create a Notification</button>
            </section>
            {selectedButton !== "" && <Model closeButtonHandler={setSelectedButton} topic={selectedButton} />}

        </>

    )
}