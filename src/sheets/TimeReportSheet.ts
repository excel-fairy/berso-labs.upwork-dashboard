class TimeReportSheet extends AbstractSheet{

    public static instance = new TimeReportSheet();

    protected SHEET_NAME = "Time report";
    private startRow = 4;
    private startColLetter = "A";
    private startCol = ColumnNames.letterToColumn(this.startColLetter);
    private startColStart0 = ColumnNames.letterToColumnStart0(this.startColLetter);
    private reservedColumns = ["B", "G", "H"];

    /**
     * Format the data before injection in the sheet (notably: add blank cells
     * in columns which data should not be erased
     */
    private formatDataToSheetShape = (data: string[][]): string[][] => {
        const formatRow = (row: string[]): string[] => {
            let destIndex = 0;
            let srcIndex = 0;
            const reservedColsIndexes = this.reservedColumns.map(ColumnNames.letterToColumnStart0);
            let retVal: string[] = [];
            while (srcIndex <= row.length) {
                if(reservedColsIndexes.includes(destIndex + this.startColStart0)) {
                    retVal.push("");
                    destIndex++;
                }
                retVal.push(row[srcIndex]);
                srcIndex++;
                destIndex++;
            }
            return retVal;
        };

        return data.map((r) => formatRow(r));
    }

    public appendEntries = (data: string[][]) => {
        const formattedData = this.formatDataToSheetShape(data);
        return this.getSheet().getRange("D9").setValue(formattedData.toString());
    }
}