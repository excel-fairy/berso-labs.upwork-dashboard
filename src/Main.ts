const dateStart = new Date("2019-10-01");
const dateEnd = new Date("2019-10-10");


function init() {
    UpworkServiceOAuth1.showSidebar();
}

function userInfo() {
    UpworkApiUtils.logResponse("User info", UserInfo.get());
}

function timeReport() {
    UpworkApiUtils.logResponse("Time report", TimeReport.get(dateStart, dateEnd));
}

function financialReport() {
    UpworkApiUtils.logResponse("Financial report", FinancialReport.get(dateStart, dateEnd));
}

function resetToken() {
    UpworkServiceOAuth1.resetToken();
}


function validateOAuthTokenAndVerifier() {
    UpworkServiceOAuth1.authCallback({
        parameter: {
            oauth_token: "requestkey",
            oauth_verifier: "verifier",
        }
    })
}

