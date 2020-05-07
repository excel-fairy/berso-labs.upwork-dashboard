/**
 * Filename makes no sense, but had to be named this way to be executed by Google apps script in the right order
 * Prevents issues from non-hoisted classes
 */
abstract class AbstractSheet {
    protected abstract SHEET_NAME: string;

    protected getSheet = () => {
        return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.SHEET_NAME);
    }
}
