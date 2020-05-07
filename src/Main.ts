function showAuhSidebar() {
    UpworkServiceOAuth1.showSidebar();
}

function userInfo() {
    UpworkApiUtils.logResponse("User info", UserInfo.getBasicInfo());
}

function timeReport() {
    const { startDate, endDate } = DateUtils.getSpanFromYearString(AdminSheet.instance.getYearToImport());
    const timeReport = TimeReport.get(startDate, endDate);
    TimeReportSheet.instance.appendEntries(timeReport);
}

function financialReport() {
    const { startDate, endDate } = DateUtils.getSpanFromYearString(AdminSheet.instance.getYearToImport());
    const financialReport = FinancialReport.getFreelancer(startDate, endDate);
    FinancialReportSheet.instance.appendEntries(financialReport);
}

function resetToken() {
    UpworkServiceOAuth1.resetToken();
}
