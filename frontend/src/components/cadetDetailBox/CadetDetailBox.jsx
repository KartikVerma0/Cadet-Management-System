import "./CadetDetailBox.css";
import PropTypes from "prop-types";

const CadetDetailBox = ({ data }) => {
    return (
        <div className="CadetDetailBox">
            {data.name && <div>
                <span className="label">Name</span>
                <span className="value">{data.name}</span>
            </div>}
            {data.nccWing && <div>
                <span className="label">Wing</span>
                <span className="value">{data.nccWing}</span>
            </div>}
            {data.enrollmentNumber && <div>
                <span className="label">Enrollment Number</span>
                <span className="value">{data.enrollmentNumber.toUpperCase()}</span>
            </div>}
            {data.nationality && <div>
                <span className="label">Nationality</span>
                <span className="value">{data.nationality}</span>
            </div>}
            {data.dob && <div>
                <span className="label">DOB</span>
                <span className="value">{new Date(data.dob).toDateString()}</span>
            </div>}
            {data.fatherName && <div>
                <span className="label">Father&apos;s Name</span>
                <span className="value">{data.fatherName}</span>
            </div>}
            {data.motherName && <div>
                <span className="label">Mother&apos;s Name</span>
                <span className="value">{data.motherName}</span>
            </div>}
            {data.address && <div>
                <span className="label">Address</span>
                <span className="value">{data.address}</span>
            </div>}
            {data.mobileNumber && <div>
                <span className="label">Mobile Number</span>
                <span className="value">{data.mobileNumber}</span>
            </div>}
            {data.email && <div>
                <span className="label">Email</span>
                <span className="value">{data.email}</span>
            </div>}
            {data.bloodGroup && <div>
                <span className="label">Blood Group</span>
                <span className="value">{data.bloodGroup.toUpperCase()}</span>
            </div>}
            {data.gender && <div>
                <span className="label">Gender</span>
                <span className="value">{data.gender.toUpperCase()}</span>
            </div>}
            {data.nccUnit && <div>
                <span className="label">NCC Unit</span>
                <span className="value">{data.nccUnit.toUpperCase()}</span>
            </div>}
            {data.department && <div>
                <span className="label">Department</span>
                <span className="value">{data.department.toUpperCase()}</span>
            </div>}
            {data.rollNumber && <div>
                <span className="label">Roll Number</span>
                <span className="value">{data.rollNumber}</span>
            </div>}
            {data.academicYear && <div>
                <span className="label">Academic Year</span>
                <span className="value">{data.academicYear}</span>
            </div>}
        </div>
    );
};
export default CadetDetailBox;

CadetDetailBox.propTypes = {
    data: PropTypes.object
}