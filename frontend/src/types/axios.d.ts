import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /** mark that this request has already been retried */
    _retry?: boolean;
  }
}