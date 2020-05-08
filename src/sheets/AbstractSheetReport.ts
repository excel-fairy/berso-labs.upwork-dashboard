abstract class AbstractSheetReport extends AbstractSheet{

    protected abstract startRow: number;
    protected abstract firstColLetter: string;
    protected abstract lastColLetter: string;
    protected abstract dateColLetter: string;

    private getFirstCol(): number {
        return ColumnNames.letterToColumn(this.firstColLetter)
    }

    private getLastCol(): number {
        return ColumnNames.letterToColumn(this.lastColLetter)
    }


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


    public deleteReportsLessThanDaysOldOld = (days: number) => {
    const getReportsLessThanDaysOld = (): string[][] => {
            const today = DateUtils.getTodayMidnight();
            const twoWeeksAgo = DateUtils.subtractDaysFromDate(today, days);
            const dayColIndex = ColumnNames.letterToColumn(this.dateColLetter)

            // @ts-ignore Sheet possibly null
            const allReports: string[][] = this.getSheet()
                .getRange(this.startRow,
                    this.getFirstCol(),
                    // @ts-ignore Sheet possibly null
                    this.getSheet().getLastRow() - this.startRow,
                    this.getLastCol() - this.getFirstCol()).getValues();

            return allReports.filter((r) => DateUtils.parseGds(r[dayColIndex]) > twoWeeksAgo);
        }

        const nbRecordsToDelete = getReportsLessThanDaysOld().length;
        // @ts-ignore Sheet possibly null
        this.getSheet().deleteColumns(this.getLastCol() - nbRecordsToDelete, nbRecordsToDelete);
    }
}
