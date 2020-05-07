const dateStart = new Date("2017-01-01");
const dateEnd = new Date("2019-10-10");


function init() {
    UpworkServiceOAuth1.showSidebar();
}

function userInfo() {
    UpworkApiUtils.logResponse("User info", UserInfo.getBasicInfo());
}

function timeReport() {
    UpworkApiUtils.logResponse("Time report", TimeReport.get(dateStart, dateEnd));
}

function financialReport() {
    UpworkApiUtils.logResponse("Financial report", FinancialReport.getFreelancer(dateStart, dateEnd));
}

function resetToken() {
    UpworkServiceOAuth1.resetToken();
}
