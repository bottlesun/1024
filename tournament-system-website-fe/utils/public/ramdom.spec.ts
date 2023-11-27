import { describe, expect } from "@jest/globals";
import Random from "./random";

describe("Random Module Test", () => {
  it("generateKoreanName Test", () => {
    for (let i = 0; i < 10; i++) {
      console.log(Random.generateKoreanName());
      //console.log(Random.getBoolean());
      //console.log(Random.getDate(new Date(2022, 1, 1), new Date()));
      //console.log(Random.getString(3));
      console.log(Random.generatePassword());
    }

    expect(Random.generateKoreanName()).toBeDefined();
  });
});
