export function DaysBetweenDates(startDate: Date, endDate: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(
    Math.abs((startDate.getTime() - endDate.getTime()) / oneDay),
  );
}

export function GetDateMinusDays(date: Date, days: number) {
  const dateToReturn = new Date(date);
  dateToReturn.setDate(date.getDate() - days);
  return dateToReturn;
}

export function GetDayAtMidDay(date: Date) {
  const dateToReturn = new Date(date);
  dateToReturn.setUTCHours(12, 0, 0, 0);
  return dateToReturn;
}
