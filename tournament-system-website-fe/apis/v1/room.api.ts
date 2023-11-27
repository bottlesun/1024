/**
 * 룸 API
 * @author 김병선
 * @version 0.1.0
 * */
import { AxiosConfig, axiosErrorExceptionAsync } from "../axios.config";
import { AxiosResponse } from "axios";
import { MatchV1PhaseRoomFindBodyReq } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.req.dto";
import { RoomV1CancelResDto, RoomV1ReplayResDto } from "@tournament/tournament-system-admin-api-type/api/v1/room-v1/room-v1.res.dto";

export class RoomAPI extends AxiosConfig {
  private _prefix = "/api/v1";
  private _url = `${this._prefix}/room`;

  constructor(useBaseURL?: boolean, token?: string) {
    super(useBaseURL, token);
  }

  /* 토너먼트 룸 취소 post*/
  public postCancelRoom = async (request: MatchV1PhaseRoomFindBodyReq): Promise<AxiosResponse<RoomV1CancelResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<RoomV1CancelResDto>(`${this._url}/cancel`, request.filter);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };

  /* 토너먼트 룸 재경기 post*/
  public postReplayRoom = async (request: MatchV1PhaseRoomFindBodyReq): Promise<AxiosResponse<RoomV1ReplayResDto, any> | AxiosResponse<any, any> | undefined> => {
    try {
      return await this.instance.post<RoomV1ReplayResDto>(`${this._url}/replay`, request.filter);
    } catch (error: unknown) {
      return axiosErrorExceptionAsync(error);
    }
  };
}
