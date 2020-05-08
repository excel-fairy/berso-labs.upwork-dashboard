type ReportingResponseColumn = {
    type: string;
    label: string;
};

type ReportingResponseRow = {
    c: ReportingResponseValue[];
};

type ReportingResponseValue = {
    v: string;
};

type ReportingResponse = {
    table: {
        cols: ReportingResponseColumn[];
        rows: ReportingResponseRow[];
    };
};

class UpworkApiUtils {
    public static extractResponse = (response: any) => {
        return JSON.parse(response.getContentText());
    }

    public static convertResponseToInjectable = (response: ReportingResponse ): string[][]=> {
        const convertRow = (r: ReportingResponseRow) => {
            return r.c.map((f) => f.v);
        }
        return response.table.rows.map((r) => convertRow(r));
    }

    public static logResponse = (indication: string, response: any) => {
        console.log(`${indication} :`, JSON.stringify(response, null, 2));
    }
}