import { MatchV1FindQueryReq, MatchV1PhaseFindQueryReq } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.req.dto";

export type FindRequestTypes = {
  params: MatchV1FindQueryReq;
  //body: MatchV1FindBodyReq;
  body: {
    filter: {
      id?: number;
      user_id?: string;
      start_at?: Date | string;
      end_at?: Date | string;
      schedule_name?: string;
      is_done: boolean;
    };
  };
};

export type FindPhaseRequestTypes = {
  params: MatchV1PhaseFindQueryReq;
  body: {
    filter: {
      id: number;
      phase?: number;
    };
  };
};

export type FindRoomPhaseRequestTypes = {
  body: {
    filter: {
      id: number;
      phase?: number;
      sequence: number;
    };
  };
};

export type PostInstanceOptionRequestTypes = {
  body: {
    filter: {
      id?: number;
      user_id?: string;
      start_at?: Date | string;
      end_at?: Date | string;
      schedule_name?: string;
    };
  };
};
