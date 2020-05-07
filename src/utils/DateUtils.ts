class DateUtils {
    public static format = (date: Date): string => {
        return Utilities.formatDate(date, "GMT", "yyyy-MM-dd");
    }

    /**
     * Return first and last day of a year
     * @param year the year
     */
    public static getSpanFromYearString = (year: string) => {
        return {
            startDate: new Date(parseInt(year), 1, 1),
            endDate: new Date(parseInt(year) + 1, 11, 31),
        }
    }
}