class FinancialReportSheet extends AbstractSheetReport{

    public static instance = new FinancialReportSheet();

    protected SHEET_NAME = "Financial report";
    protected startColLetter = "A";
    protected startRow = 2;
}