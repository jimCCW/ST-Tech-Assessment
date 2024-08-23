import { AxiosResponse } from "axios";
import httpRequest from "../lib/http-request";
import { IUploadDataResponse, IUploadFormData } from "@/types/upload";

class apiData {
  async upload(params: IUploadFormData) {
    let formData = new FormData();

    formData.append("file", params.file[0]);

    try {
      const res: AxiosResponse = await httpRequest.post<IUploadDataResponse>(
        "/data/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (error: any) {
      console.error("Axios:", error?.message);
      throw error?.message || "Error Upload file";
    }
  }
}

export default new apiData();
