class UserInfo {
    public static get = () => {
        const userBasicInfoUrl = "https://www.upwork.com/api/auth/v1/info.json";
        const userInfoUrl = "https://www.upwork.com/api/hr/v2/users/me.json";
        const userTeamsUrl = "https://www.upwork.com/api/hr/v2/teams.json";
        const userCompaniesUrl = "https://www.upwork.com/api/hr/v2/companies.json";

        const service = UpworkServiceOAuth1.getUpworkService();
        const response = service.fetch(userBasicInfoUrl);

        return UpworkApiUtils.extractResponse(response);
    }

}
