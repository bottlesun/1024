/* 토너먼트 Instance 리스트조회 & 검색 post*/
import { InstanceV1FindFilterReq, InstanceV1FindQueryReq, InstanceV1FindSortReq, InstanceV1ParamReq, InstanceV1ResumeDataReq } from "@tournament/tournament-system-admin-api-type/api/v1/instance-v1/instance-v1.req.dto";
import { ApiRes } from "@tournament/tournament-system-admin-api-type/api/api.res.dto";
import { InstanceV1FindDataRes, InstanceV1FindMetaRes } from "@tournament/tournament-system-admin-api-type/api/v1/instance-v1/instance-v1.res.dto";

export type FindRequestTypes = {
  params: InstanceV1FindQueryReq;
  body: {
    filter?: Partial<InstanceV1FindFilterReq>;
    sort: InstanceV1FindSortReq;
  };
};

export type UpdateRequestTypes = {
  params: InstanceV1ParamReq;
  body: InstanceV1ResumeDataReq;
};

export type PostDataTypes = InstanceV1FindDataRes & { status: "stop" | "stop_request" | "done" | "progress" | "wait" };

export interface PostRequestTypes extends ApiRes {
  meta: InstanceV1FindMetaRes;
  data: PostDataTypes[];
}
