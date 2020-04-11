class UpworkServiceOAuth2 {
    private static UPWORK_TOKEN_URL = "https://www.oauth.com/playground/authorization-code.html";
    private static UPWORK_DATA_URL = "";
    private static CLIENT_ID = "0oaqvx57tg5a73Dbc0h7";
    private static CLIENT_SECRET = "-cfoMOue0QrQbPWPC004FtYioy5TRGQ_4wcj-L_I";

    constructor() {
    }

    static logRedirectUri() {
        console.log(this.getUpworkService().getRedirectUri());
    }


    static showSidebar = () => {
        var service = UpworkServiceOAuth2.getUpworkService();
        if (!service.hasAccess()) {
            var authorizationUrl = service.getAuthorizationUrl();
            var template = HtmlService.createTemplate(
                '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
                'Reopen the sidebar when the authorization is complete.');
            template.authorizationUrl = authorizationUrl;
            var page = template.evaluate();
            SpreadsheetApp.getUi().showSidebar(page);
        } else {
            // ...
        }
    }


    static getUpworkService = () => {
        const service = OAuth2.createService('upwork')

            .setAuthorizationBaseUrl(UpworkServiceOAuth2.UPWORK_TOKEN_URL)
            .setTokenUrl(UpworkServiceOAuth2.UPWORK_TOKEN_URL)

            .setClientId(UpworkServiceOAuth2.CLIENT_ID)
            .setClientSecret(UpworkServiceOAuth2.CLIENT_SECRET)

            // Set the name of the callback function in the script referenced
            // above that should be invoked to complete the OAuth flow.
            .setCallbackFunction('authCallback')

            .setPropertyStore(PropertiesService.getUserProperties())
            .setLock(LockService.getUserLock())

            // Set the scopes to request (space-separated for Google services).
            .setScope('TODO');

        const cacheRepo = CacheService.getDocumentCache();
        if(cacheRepo) {
            service.setCache(cacheRepo);
        }

        return service;
    }

    static authCallback = (request: object) => {
        var service = UpworkServiceOAuth2.getUpworkService();
        var isAuthorized = service.handleCallback(request);
        if (isAuthorized) {
            return HtmlService.createHtmlOutput('Success! You can close this tab.');
        } else {
            return HtmlService.createHtmlOutput('Denied. You can close this tab');
        }
    }

    static makeRequest = () => {
        const service = UpworkServiceOAuth2.getUpworkService();
        console.log(service.getAccessToken());
        // const response = UrlFetchApp.fetch(UpworkServiceOAuth2.UPWORK_DATA_URL, {
        //     headers: {
        //         Authorization: 'Bearer ' + service.getAccessToken()
        //     }
        // });
        // // ...
    }

    static logout = () => {
        const service = UpworkServiceOAuth2.getUpworkService();
        service.reset();
    }
}

// function authCallback(request: object) {
//     return UpworkServiceOAuth2.authCallback(request);
// }



//Client Registration
// client_id	0oaqvx57tg5a73Dbc0h7
// client_secret	-cfoMOue0QrQbPWPC004FtYioy5TRGQ_4wcj-L_I

// Registered Redirect URIs
// https://www.oauth.com/playground/authorization-code.html
// https://www.oauth.com/playground/authorization-code-with-pkce.html

// Supported Grant Types
// authorization_code
// refresh_token
// implicit

// User Account
// login	expensive-dunlin@example.com
// password	Wild-Frog-Perfect-Chipmunk-0
