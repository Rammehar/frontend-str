import moment from "moment";

export class DateUtil {
  public static toMonthDayFormat(date: Date): string {
    return moment(date).utc().format("MMMM Do, YYYY");
  }
}
