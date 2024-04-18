import PropTypes from 'prop-types'
import Box from '../box/Box'
import './BoxCollection.css'

export default function BoxCollection({ boxes, section }) {
    return (
        <div className='BoxCollection'>
            {boxes.map((box) => (
                <Box key={box.id} info={box} section={section} />
            ))}
        </div>
    )
}

BoxCollection.propTypes = {
    boxes: PropTypes.array.isRequired,
    section: PropTypes.string
}