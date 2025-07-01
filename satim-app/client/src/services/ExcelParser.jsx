import ExcelJS from 'exceljs';

export async function parseExcelFile(file) {
    const buffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0];

    const json = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (!row.hidden) {
            const rowValues = row.values;
            json.push(rowValues.slice(1));
        }
    });

    const headers = json[0];
    const data = json.slice(1).map(row =>
        headers.reduce((obj, header, idx) => {
            obj[header] = row[idx] || '';
            return obj;
        }, {})
    );

    return data;
}
