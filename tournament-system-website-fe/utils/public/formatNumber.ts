/*
 * @prams num : ( ex : 1000000000 )
 * @prams type : number | string
 * @description : 숫자를 1.0b 형태로 바꾸기.
 * */

export const formatNumber = (num: number | string) => {
  num = Number(num);
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (num) {
    return num;
  } else {
    return "";
  }
};

export const formatNumberListView = (num: number | string) => {
  num = Number(num);
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (num) {
    return num;
  } else {
    return 0;
  }
};

/*
 * @prams str : ( ex : 1.0b )
 * @prams type : string
 * @description : 1.0b 형태를 숫자로 바꾸기.
 * */
export const reverseNumber = (str: string) => {
  let num = parseFloat(str);
  if (str.endsWith("K")) {
    num *= 1000;
  } else if (str.endsWith("M")) {
    num *= 1000000;
  } else if (str.endsWith("B")) {
    num *= 1000000000;
  }
  return num;
};

/*
 * @prams num , num2 : ( ex : 2,3 )
 * @prams type : number
 * @description : 1.0b 형태를 숫자로 바꾸기.
 * */

export const PowNumber = (num: number | string, num2: number | string) => {
  num = Number(num);
  num2 = Number(num2);
  if (num === 0 && num2 === 0) return undefined;
  return Number(Math.pow(num, num2));
};

/*
 * @prams minuteToSecond : ( ex : 60 )
 * @prams type :  number | string
 * @description : 분을 초로 바꾸기.
 */
export const minuteToSecond = (minute: number | string) => {
  if (!minute) return "";
  if (typeof minute === "number") return minute;
  minute = Number(minute);
  return minute * 60;
};

/*
 * @prams second : ( ex : 7200 )
 * @prams type : number | string
 * @description : 초를 분으로 바꾸기.
 */
export const secondToMinute = (second: number | string) => {
  if (!second) return "";
  second = Number(second);
  return second / 60;
};
