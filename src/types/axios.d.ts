import "axios";

declare module "axios" {
  export interface AxiosResponse {
    cached?: boolean;
    id?: string;
  }
}
