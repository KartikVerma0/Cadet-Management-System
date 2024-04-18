import BoxCollection from '../boxCollection/BoxCollection'
import './NotificationSection.css'

export default function NotificationSection() {
    const notifications = [
        {
            name: "Notification Title",
            note: "Notification Description",
            id: 1
        },
        {
            name: "Notification Title",
            note: "Notification Description",
            id: 2
        },
        {
            name: "Notification Title",
            note: "Notification Description",
            id: 3
        },
        {
            name: "Notification Title",
            note: "Notification Description",
            id: 4
        },
        {
            name: "Notification Title",
            note: "Notification Description",
            id: 5
        },
        {
            name: "Notification Title",
            note: "Notification Description",
            id: 6
        },
    ]
    return (
        <div className='NotificationSection'>
            <h2>Notifications</h2>
            <BoxCollection boxes={notifications} section="notifications" />
        </div>
    )
}