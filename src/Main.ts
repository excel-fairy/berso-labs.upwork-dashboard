function init() {
    UpworkServiceOAuth1.showSidebar();
}

function updateData() {
    UpworkServiceOAuth1.makeRequest();
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
