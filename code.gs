const SHEET_ID = '1PFs35Ww9eFqIlg5v75gelgp_RFTjOxzsJbdM_zkpzq8'
const SHEET_NAME = 'Sheet1'

function getData(id, sheetName) {
  var sheet = SpreadsheetApp.openById(id).getSheetByName(sheetName);
  var rows = sheet.getDataRange().getValues();
  var keys = rows.splice(0, 1)[0];
  return rows.map(function(row) {
    var obj = {}
    row.map(function(item, index) {
      obj[keys[index]] = item;
    });
    return obj;
  });
}

function doGet(request) {
  var func = 'jsondata';
  var data = getData(SHEET_ID, SHEET_NAME);
  return ContentService.createTextOutput(func + '(' + JSON.stringify(data, null, 2) + ')')
  .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function createRow(sheet, parameter) {
  var keys = sheet.getDataRange().getValues()[0];
  var row = [];  
  keys.map(function(key) {
    var value = parameter[key];
    if (value) {
      row.push(value);
    }
  });
  return row;
}
function appendRow(sheet, parameter) {
  var row = createRow(sheet, parameter);
  sheet.appendRow(row);
}

function doPost(e) {
  console.log(e);
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  appendRow(sheet, e.parameter);
}
