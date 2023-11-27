import { AxiosResponse } from "axios";
import { AxiosConfig, axiosErrorExceptionAsync } from "./axios.config";

export class HealthAPI extends AxiosConfig {
  private _prefix = "/api/v1";
  private _url = `${this._prefix}/instance`;

  constructor(useBaseURL?: boolean, token?: string) {
    super(useBaseURL, token);
  }

  /**
   * 헬스
   * @see https://admin-api.wannasgame.io/health
   * @version 1.0.0
   * */
  public getAsync = async (): Promise<AxiosResponse<any> | AxiosResponse<unknown, any>> => {
    try {
      return await this.instance.get<any>(`${this._url}`);
    } catch (error) {
      return axiosErrorExceptionAsync(error);
    }
  };
}
