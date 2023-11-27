import { ApiRes } from "@tournament/tournament-system-admin-api-type/api/api.res.dto";

export interface getLogoutResponsesType extends ApiRes {
  data: {
    message: string;
  };
}

export interface postLoginResponsesType extends ApiRes {
  data: {
    access_token: string;
  };
}
