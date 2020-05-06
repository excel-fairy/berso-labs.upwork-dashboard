function init() {
    UpworkServiceOAuth1.showSidebar();
}

function userInfo() {
    UpworkServiceOAuth1.getUserInfo();
}

function timeReport() {
    UpworkServiceOAuth1.getTimeReport();
}

function financialReport() {
    UpworkServiceOAuth1.getFinancialReport();
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
