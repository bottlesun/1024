import Suffler from "../private/suffler";

export default abstract class Random {
  private static _firstNames = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임"];
  private static _lastNames = ["서준", "하준", "도윤", "시우", "민준", "지호", "예준", "주원", "은우", "유준", "지훈", "현우", "준서", "우진", "건우", "현준", "도현", "동현", "지안", "서아", "하윤", "서윤", "하은", "하린", "서연", "수아", "지우", "지윤", "민서", "지민", "서현", "예은", "수빈", "윤서"];
  // 010-ABCD-EFGH 형태
  // email provider
  private static _emails = ["gmail.com", "outlook.com", "yahoo.com", "naver.com", "kakao.com"];
  private static _address = [
    {
      address: "서울특별시 송파구 올림픽로 300"
    },
    {
      address: "서울특별시 강남구 영동대로 513"
    },
    {
      address: "경기도 용인시 처인구 포곡읍 에버랜드로 199"
    },
    {
      address: "부산 해운대구 우동 1411"
    }
  ];

  public static getString = (characters: string, length: number): string => {
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  };

  public static getNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  public static getBoolean = (): boolean => {
    return this.getNumber(1, 2) === 1;
  };

  public static getDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  public static getArray = (payload: Array<string | number>): string | number => {
    return payload[Math.floor(Math.random() * payload.length)];
  };

  public static generateString = (length: number): string => {
    return this.getString("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", length);
  };

  public static generateNumericString = (length: number): string => {
    return this.getString("0123456789", length);
  };

  public static generateId = (): string => {
    const length = this.getNumber(4, 16);
    const characterLength = this.getNumber(4, 16);
    const numberLength = length - characterLength;

    const character = this.getString("abcdefghijklmnopqrstuvwxyz", characterLength);
    const number = this.getString("0123456789", numberLength);

    return `${character}${number}`;
  };

  public static generatePassword = (): string => {
    const uppercase = this.getString("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);
    const lowercase = this.getString("abcdefghijklmnopqrstuvwxyz", 4);
    const special = this.getString("`-=[];',./~!@#$%^&*()_+{}|:\"<>?", 4);
    const number = this.getString("0123456789", 4);

    return Suffler.getString(`${uppercase}${lowercase}${special}${number}`);
  };

  public static generateEmail = (): string => {
    return `${this.generateId()}@${this._emails[Math.floor(Math.random() * this._emails.length)]}`;
  };

  public static generateKoreanName = (): string => {
    return this._firstNames[Math.floor(Math.random() * this._firstNames.length)] + this._lastNames[Math.floor(Math.random() * this._lastNames.length)];
  };

  public static generateKoreanMobile = (): string => {
    const regionalAllocationNumber = this.generateNumericString(4);
    const randomNumber = this.generateNumericString(4);

    return `010-${regionalAllocationNumber}-${randomNumber}`;
  };

  public static generateKoreanAddress = (): string => {
    return this._address[Math.floor(Math.random() * this._address.length)].address;
  };
}
