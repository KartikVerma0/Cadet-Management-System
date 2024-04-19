import PropTypes from 'prop-types'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './Box.css'

export default function Box({ info, section }) {


    let { name, date, duration, description, startTime } = info;
    return (
        <div className='Box'>
            {name && <div>
                <span className='label'>{section.toUpperCase()} NAME: </span><span>{name}</span>
            </div>
            }
            <div className='sideways'>
                {date && <div>
                    <span className='label'>{section.toUpperCase()} DATE: </span><span>{date}</span>
                </div>
                }
                {duration && <div>
                    <span className='label'>{section.toUpperCase()} DURATION: </span><span>{duration} minutes</span>
                </div>
                }
                {startTime && <div>
                    <span className='label'>{section.toUpperCase()} START TIME: </span><span>{startTime}</span>
                </div>
                }
            </div>
            {description && <div>
                <span className='label'>{section.toUpperCase()} DESCRIPTION: </span><span>{description}</span>
            </div>
            }

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