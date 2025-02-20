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

export function GetDatePlusDays(date: Date, days: number) {
  const dateToReturn = new Date(date);
  dateToReturn.setDate(date.getDate() + days);
  return dateToReturn;
}

export function GetDayAtMidDay(date: Date) {
  const dateToReturn = new Date(date);
  dateToReturn.setUTCHours(12, 0, 0, 0);
  return dateToReturn;
}

export function GetDayAtGivenHour(date: Date, givenHour: number) {
  const dateToReturn = new Date(date);
  if (givenHour < 0 || givenHour > 23) {
    throw new Error('Given hour must be between 0 and 23');
  }
  dateToReturn.setUTCHours(givenHour, 0, 0, 0);
  return dateToReturn;
}
