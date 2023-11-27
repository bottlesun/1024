export default abstract class Suffler {
  public static getString = (characters: string): string => {
    const at = this.getArray(characters.split(""));

    let result = "";

    for (let i = 0; i < at.length; i++) {
      result += at[i];
    }

    return result;
  };

  // Fisher-Yates shuffle Algorithm
  public static getArray = (array: Array<string | number>): Array<string | number> => {
    for (let i = array.length - 1; i > 0; i--) {
      // 무작위 index 값을 만듭니다. (0 이상의 배열 길이 값)
      const position = Math.floor(Math.random() * (i + 1));

      // 임시로 원본 값을 저장하고, "position"을 사용해 배열 요소를 섞습니다.
      const temporary = array[i];

      array[i] = array[position];
      array[position] = temporary;
    }

    return array;
  };
}
