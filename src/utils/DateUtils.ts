class DateUtils {
    public static format = (date: Date): string => {
        return Utilities.formatDate(date, "GMT", "yyyy-MM-dd");
    }
}