class AdminSheet extends AbstractSheet{

    public static instance = new AdminSheet();

    protected SHEET_NAME = "Admin";

    private static CELLS = {
        freelancerId: "B2",
        freelancerFinancialAccountId: "B3",
        companyFinancialAccountId: "B4",
        oauthConsumerKey: "B5",
        oauthConsumerSecret: "B6",
        yearToImport: "F3",
        lastImportedDate: "F4",
    };

    public getFreelancerId = () => {
        // @ts-ignore
        return this.getSheet().getRange(AdminSheet.CELLS.freelancerId).getValue();
    }
    public getFreelancerFinancialAccountId = () => {
        // @ts-ignore
        return this.getSheet().getRange(AdminSheet.CELLS.freelancerFinancialAccountId).getValue();
    }
    public getCompanyFinancialAccountId = () => {
        // @ts-ignore
        return this.getSheet().getRange(AdminSheet.CELLS.companyFinancialAccountId).getValue();
    }
    public getOauthConsumerKey = () => {
        // @ts-ignore
        return this.getSheet().getRange(AdminSheet.CELLS.oauthConsumerKey).getValue();
    }
    public getOauthConsumerSecret = () => {
        // @ts-ignore
        return this.getSheet().getRange(AdminSheet.CELLS.oauthConsumerSecret).getValue();
    }
    public getYearToImport = () => {
        // @ts-ignore
        return this.getSheet().getRange(AdminSheet.CELLS.yearToImport).getValue();
    }
    public getLastImportedDay = () => {
        // @ts-ignore
        return this.getSheet().getRange(AdminSheet.CELLS.lastImportedDate).getValue();
    }
    public setLastImportedDay = (date: Date) => {
        const dateStr = DateUtils.format(date);
        // @ts-ignore
        return this.getSheet().getRange(AdminSheet.CELLS.lastImportedDate).setValue(dateStr);
    }
}
