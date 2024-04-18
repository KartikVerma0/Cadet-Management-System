import BoxCollection from '../boxCollection/BoxCollection'
import './PollSection.css'

export default function PollSection() {
    const polls = [
        {
            name: "Poll Title",
            note: "Poll Description",
            id: 1
        },
        {
            name: "Poll Title",
            note: "Poll Description",
            id: 2
        },
        {
            name: "Poll Title",
            note: "Poll Description",
            id: 3
        },
        {
            name: "Poll Title",
            note: "Poll Description",
            id: 4
        },
        {
            name: "Poll Title",
            note: "Poll Description",
            id: 5
        },
        {
            name: "Poll Title",
            note: "Poll Description",
            id: 6
        },
    ]
    return (
        <div className='PollSection'>
            <h2>Polls</h2>
            <BoxCollection boxes={polls} section="polls" />
        </div>
    )
}