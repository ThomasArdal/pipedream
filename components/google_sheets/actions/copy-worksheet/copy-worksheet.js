const googleSheets = require("../../google_sheets.app");

module.exports = {
  key: "google_sheets-copy-worksheet",
  name: "Copy Worksheet",
  description: "Create a new worksheet by copying an existing worksheet",
  version: "0.0.1",
  type: "action",
  props: {
    googleSheets,
    drive: {
      propDefinition: [
        googleSheets,
        "watchedDrive",
      ],
      description: "The drive containing the worksheet to copy",
    },
    sheetId: {
      propDefinition: [
        googleSheets,
        "sheetID",
        (c) => ({
          driveId: googleSheets.methods.getDriveId(c.drive),
        }),
      ],
      description: "The spreadsheet containing the worksheet to copy",
    },
    worksheetId: {
      propDefinition: [
        googleSheets,
        "worksheetIDs",
        (c) => ({
          sheetId: c.sheetId,
        }),
      ],
      type: "string",
      label: "Worksheet",
      description: "The worksheet to copy",
    },
    destinationSheetId: {
      propDefinition: [
        googleSheets,
        "sheetID",
        (c) => ({
          driveId: googleSheets.methods.getDriveId(c.drive),
        }),
      ],
      description: "The spreadsheet to copy the worksheetsheet to",
    },
  },
  async run() {
    const request = {
      spreadsheetId: this.sheetId,
      sheetId: this.worksheetId,
      resource: {
        destinationSpreadsheetId: this.destinationSheetId,
      },
    };
    return await this.googleSheets.copyWorksheet(request);
  },
};
