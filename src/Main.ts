function init() {
    UpworkServiceOAuth2.logRedirectUri();
    UpworkServiceOAuth2.showSidebar();
}

function updateData() {
    UpworkServiceOAuth2.makeRequest();
}

function logout() {
    UpworkServiceOAuth2.logout();
}
