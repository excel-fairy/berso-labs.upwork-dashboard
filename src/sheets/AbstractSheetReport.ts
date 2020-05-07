abstract class AbstractSheetReport extends AbstractSheet{

    protected abstract startRow: number;
    protected abstract startColLetter: string;
    // protected abstract reservedColumns: string[];

    protected getStartCol(): number {
        return ColumnNames.letterToColumn(this.startColLetter)
    }

    protected getStartColStart0(): number {
        return ColumnNames.letterToColumnStart0(this.startColLetter)
    }

    // /**
    //  * Enrich data with formulas
    //  * formulas are defined in the "formulas" attribute
    //  */
    // private formatDataToSheetShape = (data: string[][]): (string | null)[][] => {
    //     const formatRow = (row: string[]): (string | null)[] => {
    //         let destIndex = 0;
    //         let srcIndex = 0;
    //         const reservedColsIndexes = this.reservedColumns.map(ColumnNames.letterToColumnStart0);
    //         let retVal: (string | null)[] = [];
    //         while (srcIndex < row.length) {
    //             if(reservedColsIndexes.includes(destIndex + this.getStartColStart0())) {
    //                 retVal.push(null);
    //                 destIndex++;
    //             } else {
    //                 retVal.push(row[srcIndex]);
    //                 srcIndex++;
    //                 destIndex++;
    //             }
    //         }
    //         return retVal;
    //     };
    //
    //     return data.map((r) => formatRow(r));
    // }

    public appendEntries = (data: string[][]) => {
        // const overridePreviousData = (pData: string[][], nData: (string | null)[][]): string[][] => {
        //     console.log("ndata", nData);
        //     const retVal: string[][] = [];
        //     let i = 0;
        //     for (const r of nData) {
        //         let j = 0;
        //         let rowToSet: string[] = [];
        //         for (const v of r) {
        //             if(v) {
        //                 rowToSet.push(nData[i][j] as string);
        //             } else {
        //                 rowToSet.push(pData[i][j]);
        //             }
        //             j++;
        //         }
        //         retVal.push(rowToSet);
        //         i++;
        //     }
        //     console.log(""+retVal.length, retVal[0], retVal[1]);
        //     return retVal;
        // }

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
