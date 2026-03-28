/**
 * Real Estate Data Management & Archiving Automation
 * Developed for local real estate portfolio tracking in Konya (2026).
 * Automates row movements between main listings and archives based on status changes.
 */

function onEdit(e) {
  const ss = e.source;
  const sheet = ss.getActiveSheet();
  const range = e.range;
  const sheetName = sheet.getName();
  
  // SETTINGS (Ensure sheet names match exactly)
  const mainSheetName = "Konya Gayrimenkul 2026"; // Name of the main dashboard
  const archiveSheetName = "ARŞİV"; // Name of the archive sheet
  const triggerColumn = 1; // Column A

  const value = e.value;
  const row = range.getRow();

  // CASE 1: Move from Main List to ARCHIVE (When "Satıldı", "Kiralandı", or "Arandı" is selected)
  if (sheetName === mainSheetName && range.getColumn() === triggerColumn) {
    if (value === "Satıldı" || value === "Kiralandı" || value === "Arandı") {
      const targetSheet = ss.getSheetByName(archiveSheetName);
      const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues();
      
      targetSheet.appendRow(rowData[0]); // Append to archive
      sheet.deleteRow(row); // Remove from main list
    }
  }

  // CASE 2: Move from ARCHIVE back to Main List (When status is changed back to "Aktif")
  else if (sheetName === archiveSheetName && range.getColumn() === triggerColumn) {
    if (value === "Aktif") {
      const targetSheet = ss.getSheetByName(mainSheetName);
      if (targetSheet) {
        const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues();
        
        targetSheet.appendRow(rowData[0]); // Move back to main list
        sheet.deleteRow(row); // Remove from archive
      }
    }
  }
}
