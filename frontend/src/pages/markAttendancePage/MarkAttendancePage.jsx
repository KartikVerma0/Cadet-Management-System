import "./MarkAttendancePage.css";
import Box from "../../components/box/Box";
import MarkAttendanceCard from "../../components/markAttendanceCard/MarkAttendanceCard";
import Navbar from "../../components/navbar/Navbar";
import PropTypes from "prop-types";
import Table from "../../components/table/Table";
import useGetAllCadets from "../../hooks/useGetAllCadets";
import useGetEventData from "../../hooks/useGetEventData";
import useGetPresentCadets from "../../hooks/useGetPresentCadets";
import { useSearchParams } from "react-router-dom";

const MarkAttendancePage = ({ group }) => {
    const [searchParams] = useSearchParams()
    const eventId = searchParams.get("eventId")

    const {
        eventInfo,
        hasErrorFetchingEvent,
        hasErrorFetchingEventMessage
    } = useGetEventData(eventId)

    const {
        presentCadets,
        setPresentCadets,
        hasErrorFetchingPresentCadets,
        hasErrorFetchingPresentCadetsMessage
    } = useGetPresentCadets(eventId, group)

    const {
        allCadets,
        hasErrorFetchingAllCadets,
        hasErrorFetchingAllCadetsMessage
    } = useGetAllCadets()

    let cadetsNotMarkedPresent = allCadets?.filter((cadet) => {
        return !presentCadets.find((presentCadet) => {
            return presentCadet._id === cadet._id
        })
    })

    const handleStateAfterAttendance = (cadetInfo) => {
        cadetsNotMarkedPresent.filter((cadet) => {
            return cadet._id !== cadetInfo._id
        })

        setPresentCadets((oldPresentCadets) => {
            console.log([...oldPresentCadets, cadetInfo])
            return [...oldPresentCadets, cadetInfo]
        })
    }

    return (
        <div className="MarkAttendancePage">
            <Navbar loginType="logout" />
            {eventInfo && !hasErrorFetchingEvent && <Box info={eventInfo} section={'events'} showResponseLink={false} showMarkAttendanceLink={false} />}
            {hasErrorFetchingEvent && <p className="errorMessage">{hasErrorFetchingEventMessage}</p>}

            <h2>Present Cadets:</h2>
            {!hasErrorFetchingPresentCadets || (presentCadets && presentCadets.length > 0) ?
                <>
                    {presentCadets && presentCadets.length > 0 && <Table tableData={presentCadets} />}
                </>
                :
                <p className='errorMessage'>{hasErrorFetchingPresentCadetsMessage}</p>
            }

            <h1>Mark Attendance:</h1>
            {!hasErrorFetchingAllCadets ?
                <>
                    {cadetsNotMarkedPresent && cadetsNotMarkedPresent.length > 0 ?
                        cadetsNotMarkedPresent.map((cadet) => (
                            <MarkAttendanceCard key={cadet._id} data={cadet} eventID={eventInfo._id} handleAttendance={handleStateAfterAttendance} eventDate={eventInfo.date} />
                        ))
                        :
                        <p className='errorMessage'>No cadets to display</p>
                    }
                </>
                :
                <p className='errorMessage'>{hasErrorFetchingAllCadetsMessage}</p>
            }
        </div>
    );
};
export default MarkAttendancePage;

MarkAttendancePage.propTypes = {
    group: PropTypes.string
}