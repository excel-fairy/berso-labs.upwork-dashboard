class DateUtils {
    /**
     * Format a date to format "yyyy-MM-dd"
     */
    public static format = (date: Date): string => {
        const userTimezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
        return Utilities.formatDate(date, userTimezone, "yyyy-MM-dd");
    }

    /**
     * Format a string with date format "yyyy-MM-dd"
     */
    public static parse = (str: string): Date => {
        return new Date(str);
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