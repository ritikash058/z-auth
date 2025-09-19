// services/users/service.user.ts
import { ZAuthClient, validateRequest } from "../../lib/connection";

import {
  createUserValidator,
  resetPasswordValidator,
  changePasswordValidator,
  forgotPasswordValidator,
} from "./validators";

export class UserService {
  private client: ZAuthClient;

  constructor(client: ZAuthClient) {
    this.client = client;
  }

  async createUser(email: string, password: string, roleId: number) {
    try {
      await validateRequest(createUserValidator, { email, password });
      const data = { email, password, roleId };
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

  async login(email: string, password: string) {
    try {
      const response = await this.client.post("/users/login", {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async forgotPassword(email: string) {
    try {
      await validateRequest(forgotPasswordValidator, { email });
      const response = await this.client.post("/users/forgot-password", {
        email,
      });
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

  async resetPassword(
    token: string,
    password: string,
    confirmPassword: string
  ) {
    try {
      await validateRequest(resetPasswordValidator, {
        password,
        confirmPassword,
      });
      const response = await this.client.patch(`/users/reset-password/${token}`, {password, confirmPassword});
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

  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    try {
      await validateRequest(changePasswordValidator, {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      const response = await this.client.patch(
        `/users/change-password/${id}`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        }
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
      const response = await this.client.get(`/user/logout/${id}`);
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
      const response = await this.client.get(`/user/verify-email/${token}`);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }
}
