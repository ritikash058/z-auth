// services/tenant/service.tenant.ts
import { ZAuthClient, validateRequest } from "../../lib/connection";
import { createRoleValidator, updateRoleValidator } from "./validator.roles";

export class RoleService {
  private client: ZAuthClient;

  constructor(client: ZAuthClient) {
    this.client = client;
  }

  async createRole(name: string, description: string) {
    try {
      await validateRequest(createRoleValidator, { name, description });
      const data = { name, description };
      const response = await this.client.post("/roles", data);
      return response.data;
    } catch (error: any) {
      if (Array.isArray(error)) {
        return {
          error: error.join(', '),
          status: 400,
        };
      }
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async getAllRole() {
    try {
      const response = await this.client.get("/roles");
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async getRoleById(id: number) {
    try {
      const response = await this.client.get(`/roles/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async updateRoleById(id: number, name: string, description: string) {
    try {
      await validateRequest(updateRoleValidator, { name, description });
      const data = { name, description };
      const response = await this.client.patch(`/roles/${id}`, data);
      return response.data;
    } catch (error: any) {
      if (Array.isArray(error)) {
        return {
          error: error.join(', '),
          status: 400,
        };
      }
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async deleteRoleById(id: number) {
    try {
      const response = await this.client.delete(`/roles/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async getPermissionsByRoleId(id: number) {
    try {
      const response = await this.client.get(`/roles/permissions/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }
}