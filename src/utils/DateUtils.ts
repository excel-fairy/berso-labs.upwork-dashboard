class DateUtils {
    /**
     * Format a date to format "yyyy-MM-dd"
     */
    public static format = (date: Date): string => {
        const userTimezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
        return Utilities.formatDate(date, userTimezone, "yyyy-MM-dd");
    }

    /**
     * Format a string with date format "yyyyMMdd"
     */
    public static parseGds = (str: string): Date => {
        const year = parseInt(str.substring(0, 4))
        const month = parseInt(str.substring(4, 6))
        const day = parseInt(str.substring(6, 8))

        return new Date(year, month - 1, day)
    }

    public static subtractDaysFromDate = (date: Date, days: number): Date => {
        const retVal = new Date(date);
        retVal.setDate(date.getDate() - days);
        return retVal;
    }

    public static distanceInDays = (start: Date, end: Date): number => {
        const msPerDay = 1000 * 60 * 60 * 24;

        const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
        const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

        return Math.floor((endUtc - startUtc) / msPerDay);
    }

    public static getTodayMidnight = (): Date => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    /**
     * Return first and last day of a year
     * @param year the year
     */
    public static getSpanFromYearString = (year: string): { startDate: Date, endDate: Date } => {
        return {
            startDate: new Date(parseInt(year), 0, 1),
            endDate: new Date(parseInt(year)+1, 0, 1),
        }
    }
}