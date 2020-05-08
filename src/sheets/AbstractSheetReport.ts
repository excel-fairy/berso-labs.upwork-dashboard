abstract class AbstractSheetReport extends AbstractSheet{

    protected abstract startRow: number;
    protected abstract startColLetter: string;

    protected getStartCol(): number {
        return ColumnNames.letterToColumn(this.startColLetter)
    }

    public appendEntries = (data: string[][]) => {
        // @ts-ignore Sheet possibly null
        const startRowConsideringPreviousEntries = Math.max(this.startRow, this.getSheet().getLastRow()! + 1)
        const numRows = data.length;
        const rowLength = data.length > 0 ? data[0].length : 0;

        // @ts-ignore Sheet possibly null
        const dataRange = this.getSheet()
            .getRange(startRowConsideringPreviousEntries, this.getStartCol(), numRows, rowLength);
        dataRange.setValues(data);
    }
}
