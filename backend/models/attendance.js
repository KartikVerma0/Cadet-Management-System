import mongoose from 'mongoose'
const { Schema } = mongoose;


const monthlyAttendanceSchema = new Schema({
    month: {
        type: String,
        required: true,
        enum: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]
    },
    DrillAttended: {
        type: Number,
        required: true,
        default: 0
    },
    TotalDrill: {
        type: Number,
        required: true,
        default: 0
    },
    OtherEventsAttended: {
        type: Number,
        required: true,
        default: 0
    },
    OtherEventsTotal: {
        type: Number,
        required: true,
        default: 0
    },
    Attendancepercentage: {
        type: Number,
        required: true,
        default: 0
    },
    _id: false
});

// Default monthly attendance data for all months
const defaultMonthlyAttendanceData = [
    { month: 'January' },
    { month: 'February' },
    { month: 'March' },
    { month: 'April' },
    { month: 'May' },
    { month: 'June' },
    { month: 'July' },
    { month: 'August' },
    { month: 'September' },
    { month: 'October' },
    { month: 'November' },
    { month: 'December' }
].map(monthData => ({
    ...monthData,
    DrillAttended: 0,
    TotalDrill: 0,
    OtherEventsAttended: 0,
    OtherEventsTotal: 0,
    Attendancepercentage: 0
}));

const attendanceSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['CADET', 'PROBATION']
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    attendance: [
        {
            year: {
                type: String,
                required: true,
            },
            MonthlyAttendance: {
                type: [monthlyAttendanceSchema],
                default: defaultMonthlyAttendanceData,
                required: true
            },
            DrillAttended: {
                type: Number,
                required: true,
                default: 0
            },
            OtherEventsAttended: {
                type: Number,
                required: true,
                default: 0
            },
            TotalEventsAttended: {
                type: Number,
                required: true,
                default: 0
            },
            OverallAttendancepercentage: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ]
});




// Set default values for `attendance` array with data for multiple years
attendanceSchema.pre('validate', function (next) {
    // Populate the `attendance` array with default values for multiple years
    const currentYear = new Date().getFullYear();
    const defaultAttendanceData = [
        { year: new Date(currentYear, 0, 2).getFullYear().toString() }, // January 1st of the current year
        { year: new Date(currentYear + 1, 0, 2).getFullYear().toString() }, // January 1st of the next year
        { year: new Date(currentYear + 2, 0, 2).getFullYear().toString() }, // January 1st of the year after next
        { year: new Date(currentYear + 3, 0, 2).getFullYear().toString() }  // January 1st of the year after the year after next
    ];

    // If `attendance` array is empty (i.e., new document creation), populate it with defaults
    if (this.attendance.length === 0) {
        this.attendance = defaultAttendanceData.map(data => ({
            ...data,
            MonthlyAttendance: [...defaultMonthlyAttendanceData]
        }));
    }

    next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance