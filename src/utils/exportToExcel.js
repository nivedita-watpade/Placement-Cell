import * as XLSX from "xlsx";

function exportToExcel(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

  XLSX.writeFile(workbook, "Applicants.xlsx");
}

export { exportToExcel };
