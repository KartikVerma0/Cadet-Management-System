import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * React hook for exporting data to an Excel spreadsheet.
 *
 * Takes an array of data objects and a desired filename as input.
 * Processes the data into a format suitable for Excel and triggers a download
 * of the generated spreadsheet file.
 *
 * @param {object[]} dataToExport - Array of data objects to be exported.
 * @param {string} fileName - Desired filename for the exported spreadsheet.
 * @returns {function} A function that triggers the export process.
 */
const useExportToExcel = (dataToExport, fileName) => {
    return () => {
        const data = dataToExport.map((dataRow, index) => {
            return {
                "S. No.": index + 1,
                Name: dataRow.name, Email: dataRow.email, Wing: dataRow.nccWing,
                "Enrollment Number": dataRow.enrollmentNumber.toUpperCase(),
                Address: dataRow.address, "Mobile Number": dataRow.mobileNumber.toString(),
                Gender: dataRow.gender, Department: dataRow.department.toUpperCase(),
                "Roll Number": dataRow.rollNumber.toString(), "Academic Year": dataRow.academicYear,
                Response: dataRow.response ? 'YES' : 'NO'
            }
        })
        const exportedFileName = `${fileName}.xlsx`
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(file, exportedFileName);
    }
}

export default useExportToExcel