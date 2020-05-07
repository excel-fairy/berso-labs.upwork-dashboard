type TokenAndVerifier = {
    parameter: {
        oauth_token: string,
        oauth_verifier: string,
    }
}

class UpworkServiceOAuth1 {
    private static UPWORK_REQUEST_TOKEN_URL = "https://www.upwork.com/api/auth/v1/oauth/token/request";
    private static UPWORK_ACCESS_TOKEN_URL = "https://www.upwork.com/api/auth/v1/oauth/token/access";
    private static UPWORK_REQUEST_AUTHORIZATION_URL = "http://www.upwork.com/services/api/auth";

    private static freelancerId = "xxx";
    private static freelancerFinancialAccountId = 0;
    private static financialAccountId = 0;
    private static oauthConsummerKey = "xxx";
    private static oauthConsummerSecret = "xxx";

    static getUpworkService = () => {
        // @ts-ignore
        const service = OAuth1.createService('upwork')
            .setAccessTokenUrl(UpworkServiceOAuth1.UPWORK_ACCESS_TOKEN_URL)
            .setRequestTokenUrl(UpworkServiceOAuth1.UPWORK_REQUEST_TOKEN_URL)
            .setAuthorizationUrl(UpworkServiceOAuth1.UPWORK_REQUEST_AUTHORIZATION_URL)

            // Set the consumer key and secret.
            .setConsumerKey(UpworkServiceOAuth1.oauthConsumerKey)
            .setConsumerSecret(UpworkServiceOAuth1.oauthConsumerSecret)

            // Set the name of the callback function in the script referenced
            // above that should be invoked to complete the OAuth flow.
            .setCallbackFunction('authCallback')

            // Set the property store where authorized tokens should be persisted.
            .setPropertyStore(PropertiesService.getUserProperties());

        service.setOAuthVersion("1.0");
        service.setParamLocation("uri-query");
        service.setMethod("POST");
        return service;
    }

    static showSidebar = () => {
        const service = UpworkServiceOAuth1.getUpworkService();
        if (!service.hasAccess()) {
            console.log("Not connected to Upwork. Requesting user to authenticate");
            const authorizationUrl = service.authorize();
            const template = HtmlService.createTemplate(
                '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
                'Reopen the sidebar when the authorization is complete.');
            template.authorizationUrl = authorizationUrl;
            const page = template.evaluate();
            SpreadsheetApp.getUi().showSidebar(page);
        } else {
            // TODO: close sidebar
            console.log("Application already have access. No need to re-authorize")
            UpworkServiceOAuth1.logTokens();
        }
    }

    /**
     * Handle OAuth1 callback
     * @param request The OAuth object
     */
    static authCallback = (request: TokenAndVerifier) => {
        const service = UpworkServiceOAuth1.getUpworkService();
        const isAuthorized = service.handleCallback(request);
        if (isAuthorized) {
            return HtmlService.createHtmlOutput('Success! You can close this tab.');
        } else {
            return HtmlService.createHtmlOutput('Denied. You can close this tab');
        }
    }

    static logTokens = () => {
        console.log("Access token: ", UpworkServiceOAuth1.getUpworkService().getToken_())
        console.log("Request token: ", UpworkServiceOAuth1.getUpworkService().getRequestToken_())
    }

    static resetToken = () => {
        UpworkServiceOAuth1.getUpworkService().reset();
    }
}

function authCallback(request: TokenAndVerifier) {
    return UpworkServiceOAuth1.authCallback(request);
}
