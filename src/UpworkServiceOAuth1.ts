type TokenAndVerifier = {
    parameter: {
        oauth_token: string,
        oauth_verifier: string,
    }
}

class UpworkServiceOAuth1 {
    private static UPWORK_REQUEST_TOKEN_URL = "https://www.upwork.com/api/auth/v1/oauth/token/request";
    private static UPWORK_ACCESS_TOKEN_URL = "https://www.upwork.com/api/auth/v1/oauth/token/access";
    // TODO: Do not use authorization URL (UPWORK does not redirect to app callback URL)
    private static UPWORK_REQUEST_AUTHORIZATION_URL = "http://www.upwork.com/services/api/auth";

    private static UPWORK_BASIC_INFO_URL = "https://www.upwork.com/api/auth/v1/info.json";
    private static UPWORK_USER_INFO_URL = "https://www.upwork.com/api/hr/v2/users/me.json";
    private static UPWORK_USER_TEAMS_URL = "https://www.upwork.com/api/hr/v2/teams.json";

    private static userId = "xxx";
    private static CONSUMER_KEY = "xxx";
    private static CONSUMER_SECRET = "xxx";


    private static dateStart = "2020-04-01";
    private static dateEnd = "2020-05-01";


    private static TIME_REPORT_URL = `https://www.upwork.com/gds/timereports/v1/providers/${UpworkServiceOAuth1.userId}/hours`;
    private static TIME_REPORT_PARAM = {
        tq: `SELECT worked_on, hours, team_name, assignment_name, charges
        WHERE worked_on > "${UpworkServiceOAuth1.dateStart}" AND worked_on < "${UpworkServiceOAuth1.dateEnd}"
        ORDER BY worked_on`,
        tqx: "json",
    };

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
        service.setMethod("POST");
        return service;
    }

    // static logRedirectUri = () => {
    //     console.log(UpworkServiceOAuth1.getUpworkService().getCallbackUrl());
    // }

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

    static makeRequest = () => {
        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(UpworkServiceOAuth1.TIME_REPORT_URL, {
            payload: UpworkServiceOAuth1.TIME_REPORT_PARAM,
            }
        );
        const serviceResponse = JSON.parse(response.getContentText());
        console.log("API response: ", JSON.stringify(serviceResponse, null, 2));
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
