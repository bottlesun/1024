/**
 * Helper
 * @class
 * */
class Helper {
  /**
   *  "Json Object"를 "FormData" 형태로 변환합니다.
   *  @public
   *  @return {FormData}
   * */
  public static convertFormData = (object: any): FormData => {
    const form = new FormData();

    Object.keys(object).forEach((key) => form.append(key, object[key]));

    return form;
  };
}

export default Helper;
