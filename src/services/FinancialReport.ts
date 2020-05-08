class FinancialReport {
    public static getFreelancer = () => {
        return FinancialReport.getGeneric(undefined, AdminSheet.instance.getFreelancerFinancialAccountId());
    }

    public static getCompany = () => {
        return FinancialReport.getGeneric(undefined, AdminSheet.instance.getCompanyFinancialAccountId());
    }

    public static getFreelancerBetweenDates = (startDate: Date, endDate: Date) => {
        const dateConstraint = `WHERE date >= '${DateUtils.format(startDate)}' AND date < '${DateUtils.format(endDate)}'`;
        return FinancialReport.getGeneric(dateConstraint, AdminSheet.instance.getFreelancerFinancialAccountId());
    }

    public static getCompanyBetweenDates = (startDate: Date, endDate: Date) => {
        const dateConstraint = `WHERE date >= '${DateUtils.format(startDate)}' AND date < '${DateUtils.format(endDate)}'`;
        return FinancialReport.getGeneric(dateConstraint, AdminSheet.instance.getCompanyFinancialAccountId());
    }

    private static getGeneric = (dateConstraint: string | undefined, accountId: number) => {
        let tq = "SELECT date, type, subtype, description, buyer_team_name, assignment_name, amount ";
        if(dateConstraint) tq += dateConstraint;
        tq += " ORDER BY date";

        const url = `https://www.upwork.com/gds/finreports/v2/financial_accounts/${accountId}`;
        const params = {
            tq,
            tqx: "json",
        };

        const service = UpworkOAuthService.getUpworkService();
        const response = service.fetch(url, {
                payload: params,
            }
        );

        return UpworkApiUtils.extractResponse(response);
    }
}
