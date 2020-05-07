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


    private static dateStart = "2019-10-01";
    private static dateEnd = "2019-10-10";


    constructor() {
    }

    static getUpworkService = () => {
        // @ts-ignore
        const service = OAuth1.createService('upwork')
            .setAccessTokenUrl(UpworkServiceOAuth1.UPWORK_ACCESS_TOKEN_URL)
            .setRequestTokenUrl(UpworkServiceOAuth1.UPWORK_REQUEST_TOKEN_URL)
            .setAuthorizationUrl(UpworkServiceOAuth1.UPWORK_REQUEST_AUTHORIZATION_URL)

            // Set the consumer key and secret.
            .setConsumerKey(UpworkServiceOAuth1.oauthConsummerKey)
            .setConsumerSecret(UpworkServiceOAuth1.oauthConsummerSecret)

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
        const userBasicInfoUrl = "https://www.upwork.com/api/auth/v1/info.json";
        const userInfoUrl = "https://www.upwork.com/api/hr/v2/users/me.json";
        const userTeamsUrl = "https://www.upwork.com/api/hr/v2/teams.json";
        const userCompaniesUrl = "https://www.upwork.com/api/hr/v2/companies.json";
        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(userBasicInfoUrl);
        UpworkServiceOAuth1.logResponse("User info", UpworkServiceOAuth1.handleResponse(response));
    }

    static getTimeReport = () => {
        const url = `https://www.upwork.com/gds/timereports/v1/providers/${UpworkServiceOAuth1.freelancerId}/hours`;
        const params = {
            tq: `SELECT worked_on, hours, team_name, assignment_name, charges
                WHERE worked_on >= '${UpworkServiceOAuth1.dateStart}' AND worked_on <= '${UpworkServiceOAuth1.dateEnd}'
                ORDER BY worked_on`,
            tqx: "json",
        };

        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(url, {
                payload: params,
            }
        );
        UpworkServiceOAuth1.logResponse("Time report", UpworkServiceOAuth1.handleResponse(response));
    }

    static getFinancialReport = () => {
        const url = `https://www.upwork.com/gds/finreports/v2/financial_accounts/${UpworkServiceOAuth1.freelancerFinancialAccountId}`;
        // Fun thing: condition on dates requires to surround dates with single quotes for financial report, whereas time report supports double quotes
        const params = {
            tq: `SELECT date, type, subtype, description, buyer_team_name, amount, assignment_name 
                WHERE date >= '${UpworkServiceOAuth1.dateStart}' AND date <= '${UpworkServiceOAuth1.dateEnd}'
                ORDER BY date`,
            tqx: "json",
        };

        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(url, {
                payload: params,
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
