abstract class AbstractSheetReport extends AbstractSheet{

    protected abstract startRow: number;
    protected abstract FirstColLetter: string;

    protected getFirstCol(): number {
        return ColumnNames.letterToColumn(this.FirstColLetter)
    }

    /**
     * Append new records to existing records
     */
    public appendEntries = (data: string[][]) => {
        // @ts-ignore Sheet possibly null
        const startRowConsideringPreviousEntries = Math.max(this.startRow, this.getSheet().getLastRow()! + 1)
        const numRows = data.length;
        const rowLength = data.length > 0 ? data[0].length : 0;

        // @ts-ignore Sheet possibly null
        const dataRange = this.getSheet()
            .getRange(startRowConsideringPreviousEntries, this.getFirstCol(), numRows, rowLength);
        dataRange.setValues(data);
    }

    /**
     * Erase all existing reports and replace them with new reports
     */
    public setReports = (data: string[][]) => {
        const deleteExistingReports = (): void => {
            // @ts-ignore Sheet possibly null
            const nbRows = this.getSheet().getLastRow();
            console.log(""+this.startRow, nbRows);

            if(nbRows > this.startRow) {
                // @ts-ignore Sheet possibly null
                this.getSheet().deleteRows(this.startRow, nbRows - this.startRow);
            }
        }

        deleteExistingReports();

        // @ts-ignore Sheet possibly null
        const numRows = data.length;
        const rowLength = data.length > 0 ? data[0].length : 0;

        // @ts-ignore Sheet possibly null
        const dataRange = this.getSheet()
            .getRange(this.startRow, this.getFirstCol(), numRows, rowLength);
        dataRange.setValues(data);
    }
}
