import { AxiosResponse } from "axios";
import { AxiosConfig, axiosErrorExceptionAsync } from "../axios.config";

import { FindRequestTypes, PostRequestTypes, UpdateRequestTypes } from "../types/instance.api.type";
import { InstanceV1CreateResDto, InstanceV1DeleteResDto, InstanceV1DetailResDto, InstanceV1FindResDto, InstanceV1ResumeResDto, InstanceV1SuspendResDto, InstanceV1UpdateResDto } from "@tournament/tournament-system-admin-api-type/api/v1/instance-v1/instance-v1.res.dto";
import { InstanceV1CreateReq, InstanceV1ParamReq, InstanceV1ResumeDataReq, InstanceV1SuspendDataReq } from "@tournament/tournament-system-admin-api-type/api/v1/instance-v1/instance-v1.req.dto";

/**
 * 인스턴스 API
 * @author 김병선
 * @version 0.1.0
 * */

export class InstanceAPI extends AxiosConfig {
  private _prefix = "/api/v1";
  private _url = `${this._prefix}/instance`;

  constructor(useBaseURL?: boolean, token?: string) {
    super(useBaseURL, token);
  }

  /* 토너먼트 인스턴스 생성 post*/
  public postCreateInstance = async (id: InstanceV1CreateReq): Promise<AxiosResponse<InstanceV1CreateResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.post<InstanceV1CreateResDto>(`${this._url}`, id);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 인스턴스 수정 put*/
  public putUpdateInstance = async (request: UpdateRequestTypes): Promise<AxiosResponse<InstanceV1UpdateResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.put<InstanceV1UpdateResDto>(`${this._url}/${request.params.id}`, request.body, {
        params: request.params
      });
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 인스턴스 상세 조회 get*/
  public getInstance = async ({ id }: InstanceV1ParamReq): Promise<AxiosResponse<InstanceV1DetailResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.get<InstanceV1DetailResDto>(`${this._url}/${id}`);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 Instance 리스트조회 & 검색 post*/
  public postFindInstance = async (request: FindRequestTypes): Promise<AxiosResponse<InstanceV1FindResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<PostRequestTypes>(`${this._url}/find`, request.body, {
        params: request.params
      });
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 Instance 중지요청 post*/
  public postSuspendInstance = async (id: InstanceV1SuspendDataReq): Promise<AxiosResponse<InstanceV1SuspendResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<InstanceV1SuspendResDto>(`${this._url}/suspend`, id);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 Instance 재시작 post*/
  public postResumeInstance = async (id: InstanceV1ResumeDataReq): Promise<AxiosResponse<InstanceV1ResumeResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<InstanceV1ResumeResDto>(`${this._url}/resume`, id);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 인스턴스 삭제 delete*/
  public deleteInstance = async (id: InstanceV1ParamReq): Promise<AxiosResponse<InstanceV1DeleteResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<InstanceV1DeleteResDto>(`${this._url}/delete`, id);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };
}
