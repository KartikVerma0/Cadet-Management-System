import PropTypes from 'prop-types'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './Box.css'

export default function Box({ info, section }) {


    let { name, date, duration, note } = info;
    return (
        <div className='Box'>
            <span>{name}</span>
            <span>{date}</span>
            <span>{duration}</span>
            <span>{note}</span>

            {(section === "events" || section === "polls") &&
                <div className='actions'>
                    <button><CheckIcon /></button>
                    <button><CloseIcon /></button>
                </div>
            }
        </div>
    )
}

Box.propTypes = {
    info: PropTypes.object.isRequired,
    section: PropTypes.string
}