class UpworkApiUtils {
    public static extractResponse = (response: any) => {
        return JSON.parse(response.getContentText());
    }

    public static logResponse = (indication: string, response: any) => {
        console.log(`${indication} :`, JSON.stringify(response, null, 2));
    }
}