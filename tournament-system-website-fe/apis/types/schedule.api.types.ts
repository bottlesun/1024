/* 토너먼트 schedule 리스트조회 & 검색 post*/
import { ScheduleV1CreateReq, ScheduleV1FindFilterReq, ScheduleV1FindQueryReq, ScheduleV1FindSortReq, ScheduleV1ParamReq, ScheduleV1UpdateReq } from "@tournament/tournament-system-admin-api-type/api/v1/schedule-v1/schedule-v1.req.dto";

export type FindRequestTypes = {
  params: ScheduleV1FindQueryReq;
  body: {
    filter?: Partial<ScheduleV1FindFilterReq>;
    sort: ScheduleV1FindSortReq;
  };
};

/* 토너먼트 schedule 수정 put*/
export type UpdateRequestTypes = {
  params: ScheduleV1ParamReq;
  body: Partial<ScheduleV1UpdateReq>;
};

/* 토너먼트 schedule 생성 post*/
export type CreateRequestTypes = {
  body: ScheduleV1CreateReq;
};
