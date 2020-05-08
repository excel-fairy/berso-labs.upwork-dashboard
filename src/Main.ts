function startAuthProcess() {
    UpworkServiceOAuth1.startAuthProcess();
}

function timeReport() {
    const { startDate, endDate } = DateUtils.getSpanFromYearString(AdminSheet.instance.getYearToImport());
    const data = TimeReport.get(startDate, endDate);
    const injectableData = UpworkApiUtils.convertResponseToInjectable(data);
    TimeReportSheet.instance.appendEntries(injectableData);
}

function financialReport() {
    const { startDate, endDate } = DateUtils.getSpanFromYearString(AdminSheet.instance.getYearToImport());
    const data = FinancialReport.getFreelancer(startDate, endDate);
    const injectableData = UpworkApiUtils.convertResponseToInjectable(data);
    FinancialReportSheet.instance.appendEntries(injectableData);
}

function resetAuthTokens() {
    UpworkServiceOAuth1.resetToken();
}
