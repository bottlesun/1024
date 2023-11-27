import { AxiosResponse } from "axios";

import { AxiosConfig, axiosErrorExceptionAsync } from "../axios.config";
import { CreateRequestTypes, FindRequestTypes, UpdateRequestTypes } from "../types/schedule.api.types";
import { ScheduleV1ParamReq } from "@tournament/tournament-system-admin-api-type/api/v1/schedule-v1/schedule-v1.req.dto";
import { TemplateV1DetailResDto } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.res.dto";
import { ScheduleV1CreateResDto, ScheduleV1FindResDto, ScheduleV1RemoveResDto, ScheduleV1UpdateResDto } from "@tournament/tournament-system-admin-api-type/api/v1/schedule-v1/schedule-v1.res.dto";

/**
 * 스케줄 API
 * @author 김병선
 * @version 0.1.0
 * */

export class ScheduleAPI extends AxiosConfig {
  private _prefix = "/api/v1";
  private _url = `${this._prefix}/schedule`;

  constructor(useBaseURL?: boolean, token?: string) {
    super(useBaseURL, token);
  }

  /* 토너먼트 schedule 생성 post*/
  // @ts-ignore
  public postCreateSchedule = async (request: CreateRequestTypes): Promise<AxiosResponse<ScheduleV1CreateResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.post<ScheduleV1CreateResDto>(`${this._url}`, request.body);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 schedule 수정 put*/
  public putUpdateSchedule = async (request: UpdateRequestTypes): Promise<AxiosResponse<ScheduleV1UpdateResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.put<ScheduleV1UpdateResDto>(`${this._url}/${request.params.id}`, request.body, {
        params: request.params
      });
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 schedule 삭제 delete*/
  public deleteSchedule = async ({ id }: ScheduleV1ParamReq): Promise<AxiosResponse<ScheduleV1RemoveResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.delete<ScheduleV1RemoveResDto>(`${this._url}/${id}`);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 schedule 조회 get*/
  public getSchedule = async ({ id }: ScheduleV1ParamReq): Promise<AxiosResponse<TemplateV1DetailResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.get<TemplateV1DetailResDto>(`${this._url}/${id}`);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 schedule 리스트조회 & 검색 post*/
  public postFindSchedule = async (request: FindRequestTypes): Promise<AxiosResponse<ScheduleV1FindResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<ScheduleV1FindResDto>(`${this._url}/find`, request.body, {
        params: request.params
      });
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };
}
