type TokenAndVerifier = {
    parameter: {
        oauth_token: string,
        oauth_verifier: string,
    }
}

class UpworkServiceOAuth1 {
    private static UPWORK_ACCESS_TOKEN_URL = "http://term.ie/oauth/example/access_token.php";
    private static UPWORK_REQUEST_TOKEN_URL = "http://term.ie/oauth/example/request_token.php";
    // TODO: Do not use authorization URL (UPWORK does not redirect to app callback URL)
    private static UPWORK_REQUEST_AUTHORIZATION_URL = "http://google.com";
    private static UPWORK_DATA_URL = "http://term.ie/oauth/example/echo_api.php";
    private static CONSUMER_KEY = "key";
    private static CONSUMER_SECRET = "secret";

    constructor() {
    }

    static getUpworkService = () => {
        // @ts-ignore
        const service = OAuth1.createService('upwork')
            .setAccessTokenUrl(UpworkServiceOAuth1.UPWORK_ACCESS_TOKEN_URL)
            .setRequestTokenUrl(UpworkServiceOAuth1.UPWORK_REQUEST_TOKEN_URL)
            .setAuthorizationUrl(UpworkServiceOAuth1.UPWORK_REQUEST_AUTHORIZATION_URL)

            // Set the consumer key and secret.
            .setConsumerKey(UpworkServiceOAuth1.CONSUMER_KEY)
            .setConsumerSecret(UpworkServiceOAuth1.CONSUMER_SECRET)

            // Set the name of the callback function in the script referenced
            // above that should be invoked to complete the OAuth flow.
            .setCallbackFunction('authCallback')
            // Set the property store where authorized tokens should be persisted.
            .setPropertyStore(PropertiesService.getUserProperties());

        service.setOAuthVersion("1.0");
        service.setParamLocation("uri-query");
        return service;
    }

    // static logRedirectUri = () => {
    //     console.log(UpworkServiceOAuth1.getUpworkService().getCallbackUrl());
    // }

    static showSidebar = () => {
        const service = UpworkServiceOAuth1.getUpworkService();
        if (!service.hasAccess()) {
            const authorizationUrl = service.authorize();
            const template = HtmlService.createTemplate(
                '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
                'Reopen the sidebar when the authorization is complete.');
            // TODO: add form for verifier (and maybe confirmation of token) + call authCallback on form submission
            template.authorizationUrl = authorizationUrl;
            const page = template.evaluate();
            SpreadsheetApp.getUi().showSidebar(page);
        } else {
            // TODO: close sidebar
        }
    }

    /**
     * google-apps-script-oauth1 does not provide a way to have a callback URL that does not expire.
     * Will then have to manually enter the OAuth verifier in the sheet (via HTML popup for instance)
     * @param request The OAuth object
     */
        // TODO: will maybe have to modify OAuth1.handleCallBack() if upwork authorization page does not show the OAuth token
    static authCallback = (request: TokenAndVerifier) => {
        const service = UpworkServiceOAuth1.getUpworkService();
        const isAuthorized = service.handleCallback(request);
        if (isAuthorized) {
            return HtmlService.createHtmlOutput('Success! You can close this tab.');
        } else {
            return HtmlService.createHtmlOutput('Denied. You can close this tab');
        }
    }

    static makeRequest = () => {
        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(UpworkServiceOAuth1.UPWORK_DATA_URL);
        console.log(response);
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
