class TimeReport {
    public static get = (startDate: Date, endDate: Date): ReportingResponse => {
        const url = `https://www.upwork.com/gds/timereports/v1/providers/${AdminSheet.instance.getFreelancerId()}/hours`;
        const params = {
            tq: `SELECT worked_on, hours, team_name, assignment_name, charges, task, memo
                WHERE worked_on >= '${DateUtils.format(startDate)}' AND worked_on < '${DateUtils.format(endDate)}'
                ORDER BY worked_on`,
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
