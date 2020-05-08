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

    static getUpworkService = () => {
        // @ts-ignore
        const service = OAuth1.createService('upwork')
            .setAccessTokenUrl(UpworkServiceOAuth1.UPWORK_ACCESS_TOKEN_URL)
            .setRequestTokenUrl(UpworkServiceOAuth1.UPWORK_REQUEST_TOKEN_URL)
            .setAuthorizationUrl(UpworkServiceOAuth1.UPWORK_REQUEST_AUTHORIZATION_URL)

            // Set the consumer key and secret.
            .setConsumerKey(AdminSheet.instance.getOauthConsumerKey())
            .setConsumerSecret(AdminSheet.instance.getOauthConsumerSecret())

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

    static startAuthProcess = () => {
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
            SpreadsheetApp.getActive().toast("No need to authorize: application already authorized by Upwork");
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

    static resetToken = () => {
        UpworkServiceOAuth1.getUpworkService().reset();
        SpreadsheetApp.getActive().toast("Authorisation tokens deleted !");
    }
}

function authCallback(request: TokenAndVerifier) {
    return UpworkServiceOAuth1.authCallback(request);
}
