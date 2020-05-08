import HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse;

class UserInfo {

    public static getUserDetails = (): HTTPResponse => {
        return UserInfo.getGeneric("https://www.upwork.com/api/hr/v2/users/me.json");
    }

    public static getBasicInfo = (): HTTPResponse => {
        return UserInfo.getGeneric("https://www.upwork.com/api/auth/v1/info.json");
    }

    public static getUserTeams = (): HTTPResponse => {
        return UserInfo.getGeneric("https://www.upwork.com/api/hr/v2/teams.json");
    }

    public static getUserCompanies = (): HTTPResponse => {
        return UserInfo.getGeneric("https://www.upwork.com/api/hr/v2/companies.json");
    }

    private static getGeneric = (url: string) => {
        const service = UpworkOAuthService.getUpworkService();
        const response = service.fetch(url);
        return UpworkApiUtils.extractResponse(response);
    }
}
