import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export type AxiosRequest<H = any, P = any> = {
  headers?: H;
  params?: P;
};

export interface AxiosResponseInterceptor {
  onFulfilled: (response: AxiosResponse) => AxiosResponse;
  onRejected: (error: AxiosError) => AxiosResponse;
}

export const enum HTTP_STATUS_CODES {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  MOVED_PERMANENTLY = 301,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503
}

/**
 * JSend 상태 유형입니다.
 * @enum
 * https://github.com/omniti-labs/jsend
 */
export const enum JSEND_STATUS {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error"
}

export interface JSendResponse<M, D> {
  // 항상 "오류"로 설정되어야 합니다.
  status?: JSEND_STATUS.SUCCESS | JSEND_STATUS.FAIL | JSEND_STATUS.ERROR;
  // 무엇이 잘못되었는지 설명하는 의미 있고 최종 사용자가 읽을 수 있는(또는 최소한 기록할 가치가 있는) 메시지입니다.
  message?: string;
  // 해당되는 경우 오류에 해당하는 숫자 코드입니다.
  code?: number;
  metadata?: null | M;
  // 오류에 대한 기타 정보(예: 오류를 일으킨 조건, 스택 추적 등)에 대한 일반 컨테이너입니다.
  data?: D;
}

/**
 * JSend 성공 응답 유형입니다.
 * API 호출이 성공하면 JSend 객체는 다음과 같이 데이터 키를 사용하여 결과에 대한 단순 봉투로 사용됩니다.
 * https://github.com/omniti-labs/jsend
 * @interface
 */
export interface JSendSuccess<M, D> {
  // 항상 "성공"으로 설정되어야 합니다.
  status: JSEND_STATUS.SUCCESS;
  // API 호출에 의해 반환된 모든 데이터의 래퍼 역할을 합니다. 호출이 데이터를 반환하지 않으면(마지막 예에서와 같이) 데이터를 null로 설정해야 합니다.
  metadata?: null | M;
  data: null | D;
}

/**
 * JSend 실패 응답 유형입니다.
 * 유효하지 않은 데이터 또는 호출 조건으로 인해 API 호출이 거부되면 JSend 객체의 데이터 키에 무엇이 잘못되었는지 설명하는 객체(일반적으로 유효성 검사 오류의 해시)가 포함됩니다.
 * https://github.com/omniti-labs/jsend
 * @interface
 */
export interface JSendFail<M, D> {
  // 항상 "실패"로 설정해야 합니다.
  status: JSEND_STATUS.FAIL;
  // 요청이 실패한 이유에 대한 세부 정보에 대한 래퍼를 다시 제공합니다. 실패 이유가 POST 값에 해당하는 경우 응답 개체의 키가 해당 POST 값에 해당해야 합니다.
  metadata: null | M;
  data: null | D;
}

/**
 * JSend 오류 응답 유형입니다.
 * 서버의 오류로 인해 API 호출이 실패한 경우
 * https://github.com/omniti-labs/jsend
 * @interface
 */
export interface JSendError<M, D> {
  // 항상 "오류"로 설정되어야 합니다.
  status: JSEND_STATUS.ERROR;
  // 무엇이 잘못되었는지 설명하는 의미 있고 최종 사용자가 읽을 수 있는(또는 최소한 기록할 가치가 있는) 메시지입니다.
  message: string;
  // 해당되는 경우 오류에 해당하는 숫자 코드입니다.
  code?: number;
  metadata?: null | M;
  // 오류에 대한 기타 정보(예: 오류를 일으킨 조건, 스택 추적 등)에 대한 일반 컨테이너입니다.
  data?: D;
}

export interface HttpClientConstructor {
  axios?: AxiosInstance;
  // isInterceptorResponse?: boolean;
}

/**
 * Axios를 사용한 HTTP Client 입니다.
 * @class AxiosHttpClient
 * */
class AxiosHttpClient {
  /** @protected */
  protected axios: AxiosInstance;
  /** @protected */
  // protected isInterceptorResponse: boolean;

  /**
   * constructor description
   * @constructor
   * @param  {[HttpClientConstructor]} params [description]
   */
  constructor(params?: HttpClientConstructor) {
    Object.assign(this, params);

    this.axios = params?.axios || AxiosHttpClient.createDefaultAxios();
    // this.isInterceptorResponse = params?.isInterceptorResponse || true;

    // if (this.isInterceptorResponse) {
    //   this.axios.interceptors.response.use(AxiosHttpClient.interceptorResponseFulfilled, AxiosHttpClient.interceptorResponseRejected);
    // }
  }

  /**
   *  Axios 기본 인스턴스입니다.
   *  @private
   *  @return {AxiosInstance}
   * */
  private static createDefaultAxios(): AxiosInstance {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
      withCredentials: true,
      timeout: 30 * 1000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  /**
   *  Axios 이행 응답을 가로채 변형합니다.
   *  @private
   *  @return {AxiosResponse}
   * */
  private static interceptorResponseFulfilled(response: AxiosResponse): AxiosResponse {
    response.data = {
      statusCode: response.status,
      isError: false,
      jsonResult: response.status === HTTP_STATUS_CODES.OK || response.status === HTTP_STATUS_CODES.CREATED || response.status === HTTP_STATUS_CODES.ACCEPTED ? response.data : null
    };

    return response;
  }

  /**
   *  Axios 거부 응답을 가로채 변형합니다.
   *  @private
   *  @return {AxiosResponse}
   * */
  private static interceptorResponseRejected(error: AxiosError): AxiosResponse {
    console.error(`An error is occurred with ${error.response?.status} status code. Please, Inspect the error object of the transformResponse method in HTTP class.`);
    // ******************************************************************************** //
    // Use this statement when you need to check the error for debugging.
    // console.error(error);
    // ******************************************************************************** //
    if (!error.response) throw error;

    error.response.data = {
      statusCode: error.response.status,
      isError: true,
      jsonResult: null
    };

    return error.response;
  }
}

/**
 * module description
 * @module HttpClient
 */
export default AxiosHttpClient;
