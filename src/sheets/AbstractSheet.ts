abstract class AbstractSheet {
    protected abstract SHEET_NAME: string;

    protected getSheet = () => {
        // @ts-ignore Cannot import in Google apps script. Not importing type "Sheet"
        return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.SHEET_NAME) as Sheet;
    }
}
