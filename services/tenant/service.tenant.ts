// services/tenant/service.tenant.ts
import { ZAuthClient } from "../../lib/connection";

export class TenantService {
  private client: ZAuthClient;

  constructor(client: ZAuthClient) {
    this.client = client;
  }

  async createTenant(data: any) {
    const response = await this.client.post("/tenant", data);
    return response.data;
  }

  async getAllTenant() {
    const response = await this.client.get("/tenant");
    return response.data;
  }

  async getTenantById(id: number) {
    const response = await this.client.get(`/tenant/${id}`);
    return response.data;
  }

  async updateTenantNameById(id: number, data: any) {
    const response = await this.client.patch(`/tenant/${id}`, data);
    return response.data;
  }

  async deleteTenantById(id: number) {
    const response = await this.client.delete(`/tenant/${id}`);
    return response.data;
  }
}