/**
 * Código para Google Apps Script
 * Recibe los datos del formulario y los añade a una hoja de Google Sheets
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Si la hoja está vacía, creamos cabeceras con las claves recibidas
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(Object.keys(data));
    }

    // Obtenemos las cabeceras actuales y añadimos la fila en el orden correcto
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = headers.map(h => data[h] || '');

    // Si llegan campos nuevos que no están en cabeceras, los añadimos al final
    Object.keys(data).forEach(key => {
      if (!headers.includes(key)) {
        sheet.getRange(1, sheet.getLastColumn() + 1).setValue(key);
        row.push(data[key]);
      }
    });

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
