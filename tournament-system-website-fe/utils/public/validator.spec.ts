import { describe, expect } from "@jest/globals";
import Validator, { VALIDATOR_OPERATORS } from "./validator";

describe("Validator Module Test", () => {
  it("createRegularExpression Test", () => {
    expect(Validator.createRegularExpression("kk", [/([^\s]+(?=\.(jpg|gif|png))\.\2)/, /([^\s]+(?=\.(jpg|gif|png))\.\2)/], "a", "b", VALIDATOR_OPERATORS.OR)).toEqual({
      type: "kk",
      regexp: [/([^\s]+(?=\.(jpg|gif|png))\.\2)/, /([^\s]+(?=\.(jpg|gif|png))\.\2)/],
      operator: VALIDATOR_OPERATORS.OR,
      success: "a",
      error: "b"
    });
  });

  it("createRegularExpression Test2", () => {
    expect(Validator.createRegularExpression("kk", /([^\s]+(?=\.(jpg|gif|png))\.\2)/, "a", "b", null)).toEqual({
      type: "kk",
      regexp: /([^\s]+(?=\.(jpg|gif|png))\.\2)/,
      success: "a",
      error: "b"
    });
  });

  it("checkRegexp Test", () => {
    expect(
      Validator.checkRegexp(
        {
          type: "korean-name",
          regexp: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{0,5}$/,
          success: "성공",
          error: "관리자명은 5글자까지 가능합니다."
        },
        "박지훈"
      )
    ).toEqual({
      input: "박지훈",
      success: true,
      message: "성공"
    });
  });

  it("checkKoreanName2 Test", () => {
    expect(Validator.checkKoreanName("박지훈")).toEqual({
      success: true,
      message: "관리자명은 5글자까지 가능합니다."
    });
  });

  it("checkPassword Test", () => {
    expect(Validator.checkPassword("abcdefg1aaaa")).toEqual({
      success: true,
      message: "성공"
    });
  });
});
