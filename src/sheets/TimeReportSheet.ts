class TimeReportSheet extends AbstractSheetReport{

    public static instance = new TimeReportSheet();

    protected SHEET_NAME = "Time report";
    protected firstColLetter = "A";
    protected startRow = 4;
    protected dateColLetter = "AG";
    protected lastColLetter = "G";
    // protected reservedColumns = ["F", "G", "H"];
}