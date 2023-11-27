import { AxiosResponse } from "axios";
import { AxiosConfig, axiosErrorExceptionAsync } from "../axios.config";

import { getLogoutResponsesType, postLoginResponsesType } from "../types/manager.api.types";
import { ApiRes } from "@tournament/tournament-system-admin-api-type/api/api.res.dto";
import { ManagerV1LoginReq } from "@tournament/tournament-system-admin-api-type/api/v1/manager-v1/manager-v1.req.dto";

/*
 * 관리자 API
 * @author: 김병선
 * @version: 0.1.0
 * */

export class ManagerAPI extends AxiosConfig {
  private _prefix = "/api/v1";
  private _url = `${this._prefix}/manager`;

  constructor(useBaseURL?: boolean, token?: string) {
    super(useBaseURL, token);
  }

  /**
   * 관리자 로그인
   * */
  public postLogin = async (request: ManagerV1LoginReq): Promise<AxiosResponse<ApiRes, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.post<postLoginResponsesType>(`${this._url}/login`, request);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /**
   * 관리자 로그아웃
   * */
  public getLogout = async (): Promise<AxiosResponse<getLogoutResponsesType, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.get<getLogoutResponsesType>(`${this._url}/logout`);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };
}
