/* 토너먼트 schedule 리스트조회 & 검색 post*/
import { TemplateV1CreateReq, TemplateV1FindFilterReq, TemplateV1FindQueryReq, TemplateV1FindSortReq, TemplateV1UpdateReq } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.req.dto";

export type FindRequestTypes = {
  params: TemplateV1FindQueryReq;
  body: {
    filter?: Partial<TemplateV1FindFilterReq>;
    sort: TemplateV1FindSortReq;
  };
};

/* 토너먼트 schedule 수정 put*/
export type UpdateRequestTypes = {
  params: {
    id: string;
  };
  body: Partial<TemplateV1UpdateReq>;
};

/* 토너먼트 schedule 생성 post*/
export type CreateRequestTypes = {
  body: TemplateV1CreateReq;
};
