import "./BoxCollection.css";
import Box from "../box/Box";
import PropTypes from "prop-types";

export default function BoxCollection({ boxes, section }) {
    return (
        <div className='BoxCollection'>
            {boxes?.map((box) => (
                <Box key={box._id} info={box} section={section} />
            ))}
        </div>
    )
}

BoxCollection.propTypes = {
    boxes: PropTypes.array.isRequired,
    section: PropTypes.string
}