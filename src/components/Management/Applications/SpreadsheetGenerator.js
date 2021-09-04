import XLSX from "xlsx";

export default function SpreadsheetGenerator(name, data, extension){ //data has to be list of objects...
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    
    return (
        XLSX.writeFile(wb, `${name}-${Date().toLocaleString()}.${extension}`, {bookType:"csv"})
    );
}