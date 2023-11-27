/**
 * CSS Helper
 * @class
 * */
class HelperCss {
  public static toRem = (size: number): string => {
    const rem = size / 16;

    return `${rem}rem`;
  };
}

export default HelperCss;
