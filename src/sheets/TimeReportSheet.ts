class TimeReportSheet extends AbstractSheetReport{

    public static instance = new TimeReportSheet();

    protected SHEET_NAME = "Time report";
    protected startColLetter = "A";
    protected startRow = 4;
    // protected reservedColumns = ["F", "G", "H"];
}