/**
 * 유효성 검사기 전용 정규표현식 개체입니다.
 * @interface
 */
export interface ValidatorRegularExpression {
  type: string;
  regexp: RegExp | RegExp[];
  operator?: null | VALIDATOR_OPERATORS.AND | VALIDATOR_OPERATORS.OR;
  success: string;
  error: string;
}

/**
 * 유효성 검사기 전용 결과 개체입니다.
 * @interface
 */
export interface ValidatorResult {
  input: string;
  success: boolean;
  message: string;
}

/**
 * 유효성 검사기 복수 정규표현식 사용 시 연산자 값입니다.
 * @readonly
 * @constant
 * @enum {string}
 */
export const enum VALIDATOR_OPERATORS {
  AND = "AND",
  OR = "OR"
}

/**
 * MyClass description
 *
 * */
export default class Validator {
  private static _regexp = [
    {
      type: "name",
      regexp: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{0,5}$/,
      success: "성공",
      error: "관리자명은 5글자까지 가능합니다."
    },
    {
      type: "uid",
      regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,8}$/,
      success: "성공",
      error: "아이디는 8자까지의 영어 + 숫자 조합만 가능합니다."
    },
    {
      type: "pwd",
      operator: VALIDATOR_OPERATORS.OR,
      regexp: [/^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/],
      success: "성공",
      error: "비밀번호는 영어, 숫자, 특수문자 중 8자 이상은 3가지 이상, 10자 이상의 경우 2가지 이상 조합하여야 합니다."
    },
    {
      type: "mobile",
      regexp: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
      success: "성공",
      error: "전화번호는 하이픈을 포함한 전화번호 형식이어야 합니다."
    }
  ];
  private static _domain = new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9].[a-zA-Z]{2,}$");
  private static _userid = /^[a-z]+[a-z0-9]{3,15}$/g;
  private static _password = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  private static _email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  private static _tel = /^\d{3}-\d{3,4}-\d{4}$/;
  private static _mobile = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
  private static _url = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/;
  private static _korean = /[ㄱ-힣]/;
  private static _koreanName = /[ㄱ-힣]{2,6}/;
  private static _number = /^[0-9]+$/;
  /**
   * jpg, gif 또는 png 확장자를 가진 그림 파일명:
   * */
  private static _image = /([^\s]+(?=\.(jpg|gif|png))\.\2)/;
  private static _hexColorCode = /#?([A-Fa-f0-9]){3}(([A-Fa-f0-9]){3})?/; //  16 진수로 된 색깔 번호:
  private static _html = new RegExp("<(/?[^>]+)>/"); // html
  private static _date = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/; // 3/29/2007 or 3/33/33
  private static _ipv4 = new RegExp("\\d+\\.\\d+\\.\\d+\\.\\d+");

  public static getDynamicWordsIncludeRegExp = (word: string): RegExp => {
    return new RegExp(`/${word}/`, "g");
  };

  public static getDynamicWordsExcludeRegExp = (word: string): RegExp => {
    return new RegExp(`\b(?!\b${word}\b)\w+\b`);
  };

  public static getDynamicMergeRegExp = (pattern1: string, pattern2: string): RegExp => {
    return new RegExp(pattern1 + "|" + pattern2, "gi");
  };

  /**
   * 유효성검사기 전용 정규표현식 개체를 생성합니다.
   * @public
   * @static
   * @param  {string} type [검사 유형입니다.]
   * @param  {RegExp | RegExp[]} regexp [검사 할 단일 또는 복수의 정규표현식입니다.]
   * @param  {string} success [검사 성공 시 표현 할 메세지입니다.]
   * @param  {string} error [검사 실패 시 표현 할 메세지입니다.]
   * @param  {string} arg ["연산자 매개변수"는 기본값은 기본 값은 "AND"이며 "정규표현식 매개변수"가 배열일 경우에만 사용 할 수 있습니다.]
   * @return {ValidatorRegularExpression} [유효성검사기 정규표현식]
   */
  public static createRegularExpression = (type: string, regexp: RegExp | RegExp[], success: string, error: string, arg?: null | VALIDATOR_OPERATORS.AND | VALIDATOR_OPERATORS.OR): ValidatorRegularExpression => {
    let operator = {};

    if (Array.isArray(regexp)) {
      arg = arg == null ? VALIDATOR_OPERATORS.AND : arg;

      operator = {
        operator: arg
      };
    }

    return {
      type: type,
      regexp: regexp,
      success: success,
      error: error,
      ...operator
    };
  };

  /**
   * 정규표현식 확인합니다.
   * @static
   * @public
   * @param  {ValidatorRegularExpression} pattern 검사 할 정규표현식 개체입니다.
   * @param  {string} input 확인해야 할 입력 값입니다.
   * @return {ValidatorResult} 검사 결과 개체 입니다.
   */
  public static checkRegexp = (pattern: ValidatorRegularExpression, input: string): ValidatorResult => {
    let result: boolean = false;

    if (Array.isArray(pattern.regexp)) {
      const length = pattern.regexp.length;
      let succeed = 0;

      for (let regexp of pattern.regexp) {
        succeed = regexp.test(input) ? succeed + 1 : succeed;

        if (pattern.operator === VALIDATOR_OPERATORS.OR && succeed >= 1) {
          break;
        }
      }

      switch (pattern.operator) {
        case VALIDATOR_OPERATORS.AND:
          result = length === succeed;
          break;
        case VALIDATOR_OPERATORS.OR:
          result = succeed >= 1;
          break;
      }
    } else {
      result = pattern.regexp.test(input);
    }

    return {
      input: input,
      success: result,
      message: result ? pattern.success : pattern.error
    };
  };

  /**
   * 한국 이름 확인
   * 기본적으로 내장되어 있는 한국 이름 "정규표현식"을 이용하여 확인합니다.
   * @static
   * @public
   * @param  {String} input [확인해야 할 값]
   * @return {ValidatorResult} [확인 여부 및 메세지]
   */
  public static checkKoreanName = (input: string): ValidatorResult => {
    const pattern = this._regexp.find(({ type }) => type === "name");

    // @ts-ignore
    return this.checkRegexp(pattern, input);
  };

  /**
   * 비밀번호 확인
   * 기본적으로 내장되어 있는 한국 이름 "정규표현식"을 이용하여 확인합니다.
   * @static
   * @public
   * @param  {String} input [확인해야 할 값]
   * @return {ValidatorResult} [확인 여부 및 메세지]
   */
  public static checkPassword = (input: string): ValidatorResult => {
    const pattern = this._regexp.find(({ type }) => type === "pwd");

    // @ts-ignore
    return this.checkRegexp(pattern, input);
  };
}
