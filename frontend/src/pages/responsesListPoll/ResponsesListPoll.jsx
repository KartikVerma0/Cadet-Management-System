import "./ResponsesListPoll.css";
import Box from "../../components/box/Box";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import useExportToExcel from "../../hooks/useExportToExcel";
import useGetPollData from "../../hooks/useGetPollData.js";
import useGetPollResponses from "../../hooks/useGetPollResponses.js";
import { useParams } from "react-router-dom";

export default function ResponsesListPoll() {
    const { dataId } = useParams()

    const {
        pollInfo,
        hasErrorFetchingPoll,
        hasErrorFetchingPollMessage
    } = useGetPollData(dataId)

    const {
        pollResponses,
        hasErrorFetchingPollResponses,
        hasErrorFetchingPollResponsesMessage
    } = useGetPollResponses(dataId)

    const exportData = useExportToExcel(pollResponses, 'Poll Responses')

    return (
        <div className='ResponsesListPoll'>
            <Navbar loginType='logout' />
            {pollInfo && !hasErrorFetchingPoll && <Box info={pollInfo} section={'polls'} showResponseLink={false} />}
            {hasErrorFetchingPoll && <p className="errorMessage">{hasErrorFetchingPollMessage}</p>}
            <h1>Responses:</h1>
            {!hasErrorFetchingPollResponses ?
                <>
                    <button className='exportButton' onClick={exportData}>Export to Excel</button>
                    {pollResponses && pollResponses.length > 0 && <Table tableData={pollResponses} />}
                </>
                :
                <p className='errorMessage'>{hasErrorFetchingPollResponsesMessage}</p>
            }
        </div>
    )
}