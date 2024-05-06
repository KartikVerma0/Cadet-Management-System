import "./CampDetailsBox.css";
import PropTypes from "prop-types";

const CampDetailsBox = ({ type, addModel, title, startDate, endDate, location, description }) => {
    if (type === 'addNew') {
        return (
            <div className="CampDetailsBox" onClick={() => addModel("open")}>
                <span>+</span>
                <span>Add Camp</span>
            </div>
        );
    } else {
        return (
            <div
                className={
                    'CampDetailsBox'
                }>
                <span className="title">{title.toUpperCase()}</span>
                <p className="dates"><span>{new Date(startDate).toLocaleDateString()}</span>-<span>{new Date(endDate).toLocaleDateString()}</span></p>
                <span className="location">{location.toUpperCase()}</span>
                <span className="description">{description}</span>
            </div>
        );
    }
};
export default CampDetailsBox;

CampDetailsBox.propTypes = {
    type: PropTypes.string,
    addModel: PropTypes.func,
    title: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string
}
