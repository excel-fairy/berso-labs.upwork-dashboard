function showAuthSidebar() {
    UpworkServiceOAuth1.showSidebar();
}

function userInfo() {
    UpworkApiUtils.logResponse("User info", UserInfo.getBasicInfo());
}

function timeReport() {
    const { startDate, endDate } = DateUtils.getSpanFromYearString(AdminSheet.instance.getYearToImport());
    const data = TimeReport.get(startDate, endDate);
    TimeReportSheet.instance.appendEntries(data);
}

function financialReport() {
    const { startDate, endDate } = DateUtils.getSpanFromYearString(AdminSheet.instance.getYearToImport());
    const data = FinancialReport.getFreelancer(startDate, endDate);
    FinancialReportSheet.instance.appendEntries(data);
}

function resetToken() {
    UpworkServiceOAuth1.resetToken();
}
