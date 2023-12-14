import { HttpHeaders } from "@angular/common/http";

export interface IapiResponse {
  success: boolean;
  message: string;
  headers?:HttpHeaders
}
