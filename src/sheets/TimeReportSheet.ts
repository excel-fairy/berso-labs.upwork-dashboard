class TimeReportSheet extends AbstractSheet{

    public static instance = new TimeReportSheet();

    protected SHEET_NAME = "Time report";

    public appendEntries = (entries: object) => {
        return this.getSheet().getRange("D9").setValue(JSON.stringify(entries, null, 2));
    }
}