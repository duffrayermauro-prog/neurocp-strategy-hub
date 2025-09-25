import * as XLSX from 'xlsx';

export interface ExcelData {
  [key: string]: any;
}

export interface SheetData {
  [sheetName: string]: ExcelData[];
}

export const parseExcelFile = (file: File): Promise<SheetData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetData: SheetData = {};

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          // Convert array of arrays to array of objects using first row as headers
          if (jsonData.length > 0) {
            const headers = jsonData[0] as string[];
            const rows = jsonData.slice(1) as any[][];
            
            sheetData[sheetName] = rows.map((row) => {
              const obj: ExcelData = {};
              headers.forEach((header, index) => {
                obj[header] = row[index] || '';
              });
              return obj;
            }).filter(row => Object.values(row).some(val => val !== ''));
          }
        });

        resolve(sheetData);
      } catch (error) {
        reject(new Error('Erro ao processar arquivo Excel: ' + (error as Error).message));
      }
    };

    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsBinaryString(file);
  });
};

export const exportToExcel = (data: ExcelData[], filename: string, sheetName = 'Sheet1'): void => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportMultiSheetExcel = (sheets: { [sheetName: string]: ExcelData[] }, filename: string): void => {
  const workbook = XLSX.utils.book_new();
  
  Object.entries(sheets).forEach(([sheetName, data]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });
  
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToCSV = (data: ExcelData[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || '';
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const validateNomenclatureStructure = (data: ExcelData[]): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const requiredFields = ['campanha', 'conjunto', 'publico', 'anuncio', 'criativo', 'formato'];
  
  if (data.length === 0) {
    errors.push('Nenhum dado encontrado no arquivo');
    return { isValid: false, errors };
  }

  const headers = Object.keys(data[0]);
  const missingFields = requiredFields.filter(field => !headers.includes(field));
  
  if (missingFields.length > 0) {
    errors.push(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
  }

  // Validate data consistency
  data.forEach((row, index) => {
    requiredFields.forEach(field => {
      if (!row[field] || row[field].toString().trim() === '') {
        errors.push(`Linha ${index + 2}: Campo "${field}" está vazio`);
      }
    });
  });

  return { isValid: errors.length === 0, errors };
};