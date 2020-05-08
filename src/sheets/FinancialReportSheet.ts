class FinancialReportSheet extends AbstractSheetReport{

    public static instance = new FinancialReportSheet();

    protected SHEET_NAME = "Financial report";
    protected firstColLetter = "A";
    protected startRow = 2;
    protected dateColLetter = "AG";
    protected lastColLetter = "G";
    // protected reservedColumns = [];
}