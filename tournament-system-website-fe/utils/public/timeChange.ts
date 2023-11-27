import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/*
 * @prams timeString : ( ex : 2023-03-26 16:39:06)
 * @prams type : string
 * @description : 규격화 된 시간 타임스탬프 값으로 바꾸기.
 * */

export function standardTimeToTimestamp(timeStr: string): number {
  if (!timeStr) return timeStr as any;
  const [dateStr, time] = timeStr.split(" ");

  const [year, month, day] = dateStr.split(".");

  const [hours, minutes, seconds] = time.split(":");

  const dateObj = new Date(Date.UTC(+year, +month - 1, +day, +hours, +minutes, +seconds));

  return dateObj.getTime() / 1000;
}

/*
 * @prams timestamp : ( ex : 1686177546.604)
 * @prams type : number
 * @description : 타임스탬프 규격화된 시간 값으로 바꾸기.
 * */
export function timestampToStandardTime(timestamp: number): string {
  const dateObj = new Date(timestamp * 1000);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const dateStr = `${year}.${month.toString().padStart(2, "0")}.${day.toString().padStart(2, "0")}`;

  return `${dateStr} ${timeStr}`;
}

/*
 * @prams timestamp : ( ex : 1686177546.604)
 * @prams type : number
 * @description : 타임스탬프 규격화된 시간 값으로 바꾸기 (날짜만).
 * */
export function timestampToStandardTimeByDay(timestamp: number): string {
  const dateObj = new Date(timestamp * 1000);

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  const dateStr = `${year}.${month.toString().padStart(2, "0")}.${day.toString().padStart(2, "0")}`;

  return `${dateStr}`;
}

/*
 * @prams timeString : ( ex : 2023-03-26)
 * @prams type : string
 * @description : 규격화 된 시간 타임스탬프 값으로 바꾸기(날짜만).
 * */
export function standardTimeToTimestampByDay(timeStr: string): number {
  if (!timeStr) return timeStr as any;
  const [dateStr] = timeStr.split(" ");

  const [year, month, day] = dateStr.split(".");

  const dateObj = new Date(Date.UTC(+year, +month - 1, +day));

  return dateObj.getTime() / 1000;
}

export function standardTimeToOnlyNumberDay(timeStr: string): number {
  if (!timeStr) return timeStr as any;
  const [dateStr] = timeStr.split(" ");
  const [year, month, day] = dateStr.split(".");
  const answer = year + month + day;

  return Number(answer);
}

/*
 * @prams utcTime : ( ex : 2023-03-31T09:00:00.000Z )
 * @prams type : string
 * @description : UTC 시간을 한국 시간으로 바꾸기.
 * */
export const onKoreanTimeChange = (utcTime: string | Date) => {
  return dayjs(utcTime).format("YYYY.MM.DD HH:mm");
};

/*
 * @prams koreanTime : ( ex : 2023.03.31 09:00 )
 * @prams type : string
 * @description : 한국 시간을 UTC 시간으로 바꾸기.
 * */

export const onUtcTimeChange = (koreanTime: string | Date) => {
  return dayjs(koreanTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
};

/*
 * @prams time : ( ex : 15 )
 * @prams type : number
 * @description : 초 단위 유닛 붙이기.
 * */

export const onTimeSecondsUnit = (time: number) => {
  if (time === 0) return "";
  if (time === undefined) return "";
  return time + "'s";
};
