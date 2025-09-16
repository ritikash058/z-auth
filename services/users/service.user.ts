// services/users/service.user.ts
import { ZAuthClient } from "../../lib/connection";
import { validationResult } from "express-validator";
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

  private validateRequest(validators: any[], data: any) {
    return new Promise((resolve, reject) => {
      const req = { body: data };
      const runValidation = async () => {
        for (const validator of validators.flat()) {
          await validator(req, {}, () => {});
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          return reject(errorMessages);
        }
        resolve(true);
      };
      runValidation();
    });
  }

  async createUser(email: string, password: string) {
    try {
      await this.validateRequest(createUserValidator, { email, password });
      const response = await this.client.post("/users", { email, password });
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
      await this.validateRequest(forgotPasswordValidator, { email });
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
      await this.validateRequest(resetPasswordValidator, {
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
      await this.validateRequest(changePasswordValidator, {
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
