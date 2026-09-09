
// logic to handle excel 

import xlsx from 'xlsx'

export class ExcelUtils {

    // which excel file to be read 
    // which sheet from the excel
    // filepath, name of the sheet
    static getExcelData(filepath:string, sheetname:string){
   
   try{
    // readfile method present inside the excel. 
    // readfile is used to read the data from the file and will return in workbook format 
    // workbook formet is nothing having sheetname and value
        const wb = xlsx.readFile(filepath)
        const sheet= wb.Sheets[sheetname]
        const data = xlsx.utils.sheet_to_json(sheet)
        return data

   } catch(error){
    console.log(error);

   }

    }
}