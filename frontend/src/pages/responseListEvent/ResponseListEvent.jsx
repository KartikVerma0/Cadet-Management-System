import "./ResponseListEvent.css";
import Box from "../../components/box/Box";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import useExportToExcel from "../../hooks/useExportToExcel";
import useGetEventData from "../../hooks/useGetEventData";
import useGetEventResponses from "../../hooks/useGetEventResponses";
import { useParams } from "react-router-dom";

export default function ResponsesListEvent() {
    const { dataId } = useParams()

    const {
        eventInfo,
        hasErrorFetchingEvent,
        hasErrorFetchingEventMessage
    } = useGetEventData(dataId)

    const {
        eventResponses,
        hasErrorFetchingEventResponses,
        hasErrorFetchingEventResponsesMessage
    } = useGetEventResponses(dataId)

    const exportData = useExportToExcel(eventResponses, 'Event Responses')

    return (
        <div className='ResponsesListEvent'>
            <Navbar loginType='logout' />
            {eventInfo && !hasErrorFetchingEvent && <Box info={eventInfo} section={'events'} showResponseLink={false} />}
            {hasErrorFetchingEvent && <p className="errorMessage">{hasErrorFetchingEventMessage}</p>}
            <h1>Responses:</h1>
            {!hasErrorFetchingEventResponses ?
                <>
                    <button className='exportButton' onClick={exportData}>Export to Excel</button>
                    {eventResponses && eventResponses.length > 0 && <Table tableData={eventResponses} />}
                </>
                :
                <p className='errorMessage'>{hasErrorFetchingEventResponsesMessage}</p>
            }
        </div>
    )
}