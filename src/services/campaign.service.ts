import { ICampaign } from "@/interfaces/campaign.inteface";
import { apiService } from "./api.service";

import { RequestConfig } from "@/interfaces/api.interface";
export class CampaignService {
  public static async create(payload: Partial<ICampaign>): Promise<any> {
    try {
      const response = await apiService.post<any>({
        endpoint: "/test",
        body: payload,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }
  public static async update(payload: Partial<ICampaign>): Promise<any> {
    try {
      const { _id, ...body } = payload;
      const response = await apiService.put<any>({
        endpoint: `/test/${_id}`,
        body,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  public static async list(config: RequestConfig): Promise<ICampaign[]> {
    try {
      const { params, options, token } = config;
      const response = await apiService.get<any>({
        endpoint: "/test",
        params,
        options: options,
        token,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }
  public static async delete(id: string): Promise<ICampaign[]> {
    try {
      const response = await apiService.delete<any>({
        endpoint: `/test/${id}`,
      });
      return response;
    } catch (error: any) {
      return error?.message;
    }
  }
}
