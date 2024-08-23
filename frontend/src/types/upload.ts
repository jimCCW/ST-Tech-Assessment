import { IGenericAPIResponse } from "./generic";

export interface IUploadFormData {
  file: FileList;
}

export type TCsvData = {
  postId: string;
  id: string;
  name: string;
  email: string;
  body?: string;
};

export interface IUploadDataResponse extends IGenericAPIResponse {
  data?: TCsvData[];
}
