import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type AxiosRequest<P = any, Q = any, B = any, H = any> = {
  param?: P;
  query?: Q;
  body?: B;
  header?: H;
};

export const axiosErrorExceptionAsync = (error: unknown): Promise<AxiosResponse<unknown, any>> => {
  const { response, request, message, config } = error as AxiosError;

  if (response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(response.data);
    console.log(response.status);
    console.log(response.headers);
  } else if (request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", message);
  }

  console.log(config);

  return new Promise((resolve: (value: AxiosResponse<unknown, any>) => void): void => {
    resolve(response as AxiosResponse<unknown, any>);
  });
};

export abstract class AxiosConfig {
  protected instance: AxiosInstance;
  protected token?: string;
  protected readonly baseURL: string;

  protected constructor(useBaseURL?: boolean, token?: string) {
    this.baseURL = useBaseURL ? process.env.NEXT_PUBLIC_API_URL || "" : "";

    this.instance = axios.create({
      baseURL: this.baseURL
    });
    this.token = token;
    this.interceptor();
  }

  private interceptor = (): void => {
    this.instance.interceptors.request.use(this.request);
  };

  private request = (config: AxiosRequestConfig): any => {
    this.token && (config.headers!["access-token"] = `${this.token}`);
    //config.headers!["api-key"] = "ea6abc17-8104-4695-b687-602af25027cc";
    config.headers!["language_tag"] = "ko";
    config.headers!["Accept"] = "application/json";
    config.timeout = 30 * 1000;

    return config;
  };
}
