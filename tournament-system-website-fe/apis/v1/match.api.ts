/**
 * 대전 API
 * @author 김병선
 * @version 0.1.0
 * */
import { AxiosConfig, axiosErrorExceptionAsync } from "../axios.config";
import { AxiosResponse } from "axios";
import { FindPhaseRequestTypes, FindRequestTypes, FindRoomPhaseRequestTypes, PostInstanceOptionRequestTypes } from "../types/match.api.type";
import { MatchV1FindResDto, MatchV1PhaseFindResDto, MatchV1PhaseRoomFindResDto, MatchV1ProgressResDto } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.res.dto";

export class MatchAPI extends AxiosConfig {
  private _prefix = "/api/v1";
  private _url = `${this._prefix}/match`;

  constructor(useBaseURL?: boolean, token?: string) {
    super(useBaseURL, token);
  }

  /*토너먼트 대전 진행중 리스트 */

  /* 토너먼트 매치 옵션 post*/
  public postMatchInstanceOption = async (request: PostInstanceOptionRequestTypes): Promise<AxiosResponse<MatchV1ProgressResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<MatchV1ProgressResDto>(`${this._url}/instance/option`, {
        filter: request.body.filter
      });
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 대전 검색 post*/
  public postFindMatch = async (request: FindRequestTypes): Promise<AxiosResponse<MatchV1FindResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<MatchV1FindResDto>(`${this._url}/find`, request.body, {
        params: request.params
      });
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };
  /* 토너먼트 운영 요약 정보 post */
  public postFindMatchProgress = async (): Promise<AxiosResponse<MatchV1ProgressResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<MatchV1ProgressResDto>(`${this._url}/progress`);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 대전 단계 검색 post*/
  public postFindMatchPhase = async (request: FindPhaseRequestTypes): Promise<AxiosResponse<MatchV1PhaseFindResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<MatchV1PhaseFindResDto>(`${this._url}/phase/find`, request.body, {
        params: request.params
      });
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /*토너먼트 대전 단계 방 검색 post*/
  public postFindMatchPhaseRoom = async (request: FindRoomPhaseRequestTypes): Promise<AxiosResponse<MatchV1PhaseRoomFindResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<MatchV1PhaseRoomFindResDto>(`${this._url}/phase/room/find`, request.body);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };
}
