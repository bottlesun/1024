import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { NextRouter } from "next/router";

export const enum STATUS {
  DEFAULT = -1,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  UNAUTHORIZED = 401
}

export interface IAxiosInterceptorResponse {
  onFulfilled: (response: AxiosResponse) => AxiosResponse;
  onRejected: (error: AxiosError) => AxiosResponse;
}

export interface IJsonResult<M, D> {
  processedDateTime: string;
  meta: M | null;
  data: D | null;
}
export type TJsonResult<T> = {
  processedDateTime: null | string;
  meta: null | Partial<IMetaData>;
  data: null | T;
  params: null | string;
};

export interface IErrorMessage {
  error: "string";
}
export interface IMessage {
  message: string | IErrorMessage;
}

export interface IMetaData {
  currentPage: number;
  countPerPage: number;
  totalCount: number;
}

export interface IResponseBase<M, D> {
  statusCode: number;
  isError: boolean;
  jsonResult: IJsonResult<M, D>;
}

class Http {
  protected axios: AxiosInstance;
  protected isUsingDummyData: boolean;
  private SIGN_IN_PAGE_URL: string = "/administrator/login";
  private ERROR_PAGE_URL: string = "/_error";
  private ABOUT_PAGE_URL: string = "/about";

  constructor() {
    this.isUsingDummyData = JSON.parse("false");
    this.axios = Http.createAxios();
    const transformResponse = Http.transformResponse();
    this.axios.interceptors.response.use(transformResponse.onFulfilled, transformResponse.onRejected);
  }

  private static createAxios(): AxiosInstance {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
      timeout: 30 * 1000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  private static transformResponse(): IAxiosInterceptorResponse {
    return {
      onFulfilled: (response: AxiosResponse): AxiosResponse => {
        response.data = {
          statusCode: response.status,
          isError: false,
          jsonResult: response.status === STATUS.OK || response.status === STATUS.CREATED || response.status === STATUS.ACCEPTED ? response.data : null
        };
        return response;
      },
      onRejected: (error: AxiosError): AxiosResponse => {
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
    };
  }

  public signOut(router: NextRouter) {
    if (typeof window === "undefined") throw new Error("The signOut method only can be executed on client side.");
    router.push(this.SIGN_IN_PAGE_URL);
  }

  public setError(router: NextRouter) {
    if (typeof window === "undefined") throw new Error("The goToError method only can be executed on client side.");
    router.push(this.ERROR_PAGE_URL);
  }

  public getSignInPage() {
    return {
      redirect: {
        permanent: false,
        destination: this.SIGN_IN_PAGE_URL
      }
    };
  }

  public getErrorPage() {
    return {
      redirect: {
        permanent: false,
        destination: this.ERROR_PAGE_URL
      }
    };
  }
  public getAboutPage() {
    return {
      redirect: {
        permanent: false,
        destination: this.ABOUT_PAGE_URL
      }
    };
  }
}

export default Http;
