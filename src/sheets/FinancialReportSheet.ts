class FinancialReportSheet extends AbstractSheet{

    public static instance = new FinancialReportSheet();

    protected SHEET_NAME = "Financial report";

    // TODO: refactor in abstract class for financial report and time report
    public appendEntries = (entries: object) => {
        return this.getSheet().getRange("D9").setValue(JSON.stringify(entries, null, 2));
    }
}