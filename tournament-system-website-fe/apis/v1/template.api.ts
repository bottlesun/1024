import { AxiosResponse } from "axios";
import { AxiosConfig, axiosErrorExceptionAsync } from "../axios.config";
import { CreateRequestTypes, FindRequestTypes, UpdateRequestTypes } from "../types/template.api.type";
import { TemplateV1CreateResDto, TemplateV1DetailResDto, TemplateV1FindResDto, TemplateV1RemoveResDto, TemplateV1UpdateResDto } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.res.dto";
import { TemplateV1ParamReq } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.req.dto";

/**
 * 템플릿 API
 * @author 김병선
 * @version 0.1.0
 * */

export class TemplateAPI extends AxiosConfig {
  private _prefix = "/api/v1";
  private _url = `${this._prefix}/template`;

  constructor(useBaseURL?: boolean, token?: string) {
    super(useBaseURL, token);
  }

  /* 토너먼트 template 생성 post*/
  public postCreateTemplate = async (request: CreateRequestTypes): Promise<AxiosResponse<TemplateV1CreateResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.post<TemplateV1CreateResDto>(`${this._url}`, request.body);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 template 수정 put*/
  public putUpdateTemplate = async (request: UpdateRequestTypes): Promise<AxiosResponse<TemplateV1UpdateResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.put<TemplateV1UpdateResDto>(`${this._url}/${request.params.id}`, request.body);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 template 삭제 delete*/
  public deleteTemplate = async ({ id }: TemplateV1ParamReq): Promise<AxiosResponse<TemplateV1RemoveResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.delete<TemplateV1RemoveResDto>(`${this._url}/${id}`);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 template 조회 get*/
  public getTemplate = async ({ id }: TemplateV1ParamReq): Promise<AxiosResponse<TemplateV1DetailResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.get<TemplateV1DetailResDto>(`${this._url}/${id}`);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 template 리스트조회 & 검색 post*/
  public postFindTemplate = async (request: FindRequestTypes): Promise<AxiosResponse<TemplateV1FindResDto, any> | AxiosResponse<any, any>> => {
    try {
      return await this.instance.post<TemplateV1FindResDto>(`${this._url}/find`, request.body, {
        params: request.params
      });
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };
}
