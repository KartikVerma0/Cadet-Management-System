import "./Table.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Table = ({ tableData }) => {
    const [columns, setColumns] = useState([])
    useEffect(() => {
        setColumns(Object.keys(tableData[0]))
    }, [tableData])

    return (
        <table className="Table">
            <thead>
                <tr className='headingRow'>
                    <th>S. No.</th>
                    {columns?.includes('name') && <th>Name</th>}
                    {columns?.includes('nccWing') && <th>Wing</th>}
                    {columns?.includes('nccUnit') && <th>Unit</th>}
                    {columns?.includes('enrollmentNumber') && <th>Enrollment No.</th>}
                    {columns?.includes('email') && <th>Email</th>}
                    {columns?.includes('response') && <th>Response</th>}
                </tr>
            </thead>
            <tbody>
                {tableData?.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            {data.name && <td>{data.name}</td>}
                            {data.nccWing && <td>{data.nccWing}</td>}
                            {data.nccUnit && <td>{data.nccUnit.toUpperCase()}</td>}
                            {data.enrollmentNumber && <td>{data.enrollmentNumber.toUpperCase()}</td>}
                            {data.email && <td>{data.email}</td>}
                            {data.response !== undefined && <td className={data.response ? 'font-green' : 'font-red'}>{data.response ? 'YES' : 'NO'}</td>}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};
export default Table;

Table.propTypes = {
    tableData: PropTypes.array
}
