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

    private static USER_BASIC_INFO_URL = "https://www.upwork.com/api/auth/v1/info.json";
    private static USER_INFO_URL = "https://www.upwork.com/api/hr/v2/users/me.json";
    private static USER_TEAMS_URL = "https://www.upwork.com/api/hr/v2/teams.json";
    private static USER_COMPANIES_URL = "https://www.upwork.com/api/hr/v2/companies.json";

    private static userId = "xxx";
    private static CONSUMER_KEY = "xxx";
    private static CONSUMER_SECRET = "xxx";


    private static dateStart = "2019-10-01";
    private static dateEnd = "2019-10-10";


    private static TIME_REPORT_URL = `https://www.upwork.com/gds/timereports/v1/providers/${UpworkServiceOAuth1.userId}/hours`;
    private static TIME_REPORT_PARAM = {
        tq: `SELECT worked_on, hours, team_name, assignment_name, charges
        WHERE worked_on >= '${UpworkServiceOAuth1.dateStart}' AND worked_on <= '${UpworkServiceOAuth1.dateEnd}'
        ORDER BY worked_on`,
        tqx: "json",
    };

    // TODO: TEAM_ID is retrieved from USER_TEAMS_URL. Current user does not seem to be able to access financial records for its team.
    private static FINANCIAL_REPORT_URL = `https://www.upwork.com/gds/finreports/v2/financial_accounts/xxx`;
    // Fun thing: condition on dates requires to surround dates with single quotes for financial report, whereas time repport supports double quotes
    private static FINANCIAL_REPORT_PARAM = {
        tq: `SELECT date, type, subtype, description, buyer_team_name, amount, assignment_name 
        WHERE date >= '${UpworkServiceOAuth1.dateStart}' AND date <= '${UpworkServiceOAuth1.dateEnd}'
        ORDER BY date`,
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

    static getUserInfo = () => {
        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(UpworkServiceOAuth1.USER_COMPANIES_URL);
        UpworkServiceOAuth1.logResponse("User info", UpworkServiceOAuth1.handleResponse(response));
    }

    static getTimeReport = () => {
        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(UpworkServiceOAuth1.TIME_REPORT_URL, {
                payload: UpworkServiceOAuth1.TIME_REPORT_PARAM,
            }
        );
        UpworkServiceOAuth1.logResponse("Time report", UpworkServiceOAuth1.handleResponse(response));
    }

    static getFinancialReport = () => {
        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(UpworkServiceOAuth1.FINANCIAL_REPORT_URL, {
                payload: UpworkServiceOAuth1.FINANCIAL_REPORT_PARAM,
            }
        );
        UpworkServiceOAuth1.logResponse("Financial report", UpworkServiceOAuth1.handleResponse(response));
    }

    private static handleResponse = (response: any) => {
        return JSON.parse(response.getContentText());
    }

    private static logResponse = (indication: string, response: any) => {

        console.log(`indication :`, JSON.stringify(response, null, 2));
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
