class TimeReport {
    public static get = (): ReportingResponse => {
        return TimeReport.getGeneric(undefined);
    }

    public static getBetweenDates = (startDate: Date, endDate: Date): ReportingResponse => {
        const dateConstraint = `WHERE worked_on >= '${DateUtils.format(startDate)}' AND worked_on < '${DateUtils.format(endDate)}'`;
        return TimeReport.getGeneric(dateConstraint);
    }
    public static getGeneric = (dateConstraint: string | undefined): ReportingResponse => {
        let tq = "SELECT worked_on, hours, team_name, assignment_name, charges, task, memo ";
        if(dateConstraint) tq += dateConstraint;
        tq += " ORDER BY worked_on";

        const url = `https://www.upwork.com/gds/timereports/v1/providers/${AdminSheet.instance.getFreelancerId()}/hours`;
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
