class FinancialReport {

    public static getFreelancer = (startDate: Date, endDate: Date) => {
        return FinancialReport.getGeneric(startDate, endDate, AdminSheet.instance.getFreelancerFinancialAccountId());
    }

    public static getCompany = (startDate: Date, endDate: Date) => {
        return FinancialReport.getGeneric(startDate, endDate, AdminSheet.instance.getCompanyFinancialAccountId());
    }

    private static getGeneric = (startDate: Date, endDate: Date, accountId: number) => {
        const url = `https://www.upwork.com/gds/finreports/v2/financial_accounts/${accountId}`;
        // Fun thing: condition on dates requires to surround dates with single quotes for financial report, whereas time report supports double quotes
        const params = {
            tq: `SELECT date, type, subtype, description, buyer_team_name, amount, assignment_name 
                WHERE date >= '${DateUtils.format(startDate)}' AND date <= '${DateUtils.format(endDate)}'
                ORDER BY date`,
            tqx: "json",
        };

        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(url, {
                payload: params,
            }
        );

        return UpworkApiUtils.extractResponse(response);
    }
}
