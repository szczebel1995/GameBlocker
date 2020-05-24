import dateformat from "dateformat";

export const craftTimerString = (miliseconds: number) => {
  const seconds = ((miliseconds / 1000) % 60).toFixed(0);
  const minutes = ((miliseconds / 60000) % 60).toFixed(0);
  const hours = (miliseconds / 3600000).toFixed(0);
  const days = (miliseconds / (3600000 * 24)).toFixed(0);

  return `${padTimeWithZero(days)}:${padTimeWithZero(hours)}:${padTimeWithZero(
    minutes
  )}:${padTimeWithZero(seconds)}`;
};

const padTimeWithZero = (number: string) => {
  return `${+number < 10 ? "0" : ""}${number}`;
};

export enum TimeUnitNameE {
  MINUTE = "minute",
  HOUR = "hour",
  DAY = "day",
}

export enum TimeUnitValueE {
  MINUTE = 60000,
  HOUR = 3600000,
  DAY = 86400000,
}

export const getMiliseconds = (timeAmount: number, timeUnit: TimeUnitNameE) => {
  switch (timeUnit) {
    case TimeUnitNameE.MINUTE:
      return timeAmount * TimeUnitValueE.MINUTE;
    case TimeUnitNameE.HOUR:
      return timeAmount * TimeUnitValueE.HOUR;
    case TimeUnitNameE.DAY:
      return timeAmount * TimeUnitValueE.DAY;
  }
};

export const randomTimeRange = (
  from: number,
  to: number,
  unit: TimeUnitValueE,
  decimals: number = 0
): number => {
  if (from > to) {
    throw new Error("'from' can't be bigger than 'to'");
  }

  return Math.round((Math.random() * (to - from) + from) * unit);
};

export const getCalendarFormatedDate = (timestamp: number) =>
  dateformat(timestamp, "yyyy-mm-dd");

export const sameDay = (timestamp1: number, timestamp2: number): boolean => {
  if (Math.abs(timestamp1 - timestamp2) > TimeUnitValueE.DAY) {
    return false;
  } else {
    const split1 = getCalendarFormatedDate(timestamp1).split("-");
    const split2 = getCalendarFormatedDate(timestamp2).split("-");
    return split1[split1.length - 1] === split2[split2.length - 1];
  }
};
