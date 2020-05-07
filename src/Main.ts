function showAuthSidebar() {
    UpworkServiceOAuth1.showSidebar();
}

function userInfo() {
    UpworkApiUtils.logResponse("User info", UserInfo.getBasicInfo());
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

function resetToken() {
    UpworkServiceOAuth1.resetToken();
}
