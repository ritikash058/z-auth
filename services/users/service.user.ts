// services/users/service.user.ts
import { ZAuthClient, validateRequest } from "../../lib/connection";
import { I_Users , I_ChangePassword, I_ForgotPasswordRequest, I_LoginRequest, I_ResetPassword, I_UpdateUserByIdRequest } from "./interface.user";
import {
  createUserValidator,
  resetPasswordValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  updateUserRoleValidator,
} from "./validators";

export class UserService {
  private client: ZAuthClient;

  constructor(client: ZAuthClient) {
    this.client = client;
  }

  async createUser(data: I_Users) {
    try {
      await validateRequest(createUserValidator, data as I_Users);
      const response = await this.client.post("/users", data);
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

  async login(data: I_LoginRequest) {
    try {
      const response = await this.client.post("/users/login", data);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async forgotPassword(data: I_ForgotPasswordRequest) {
    try {
      await validateRequest(forgotPasswordValidator, data);
      const response = await this.client.post("/users/forgot-password", data);
      return response.data;
    } catch (error: any) {
      if (Array.isArray(error)) {
        return {
          error: error.join(", "),
          status: 400,
        };
      }
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async resetPassword(token: string, data: I_ResetPassword) {
    try {
      await validateRequest(resetPasswordValidator, data);
      const response = await this.client.patch(`/users/reset-password/${token}`, data);
      return response.data;
    } catch (error: any) {
      if (Array.isArray(error)) {
        return {
          error: error.join(", "),
          status: 400,
        };
      }
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async changePassword(id: string, data: I_ChangePassword) {
    try {
      await validateRequest(changePasswordValidator, data);
      const response = await this.client.patch(
        `/users/change-password/${id}`,
        data
      );
      return response.data;
    } catch (error: any) {
      if (Array.isArray(error)) {
        return {
          error: error.join(", "),
          status: 400,
        };
      }
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async getUserById(id: string) {
    try {
      const response = await this.client.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async deleteUserById(id: string) {
    try {
      const response = await this.client.delete(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async logout(id: string) {
    try {
      const response = await this.client.get(`/users/logout/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async verifyEmail(token: string) {
    try {
      const response = await this.client.get(`/users/verify-email/${token}`);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async updateUserRole (userId: string, data: I_UpdateUserByIdRequest) {
    try {
      await validateRequest(updateUserRoleValidator,data)
      const response = await this.client.patch(`/users/update-role/${userId}`, data);
      return response.data;
    } catch (error: any) {
      if (Array.isArray(error)) {
        return {
          error: error.join(", "),
          status: 400,
        };
      }
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async getAccessToken() {
    try {
      const response = await this.client.get("/users/jwt-secert");
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async getRefreshToken() {
    try {
      const response = await this.client.get("/users/refresh-secert");
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }
}
