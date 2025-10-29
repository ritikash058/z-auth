export interface I_Users {
  email?: string;
  contactNumber?: string;
  password: string;
  roleId: number[];
}

export interface I_ResetPassword {
  password: string;
  confirmPassword: string;
}

export interface I_VerficationToken {
  verificationToken: string;
  verificationTokenExpiresAt: Date;
}

export interface I_ResetPasswordToken {
  resetToken: string;
  resetTokenExpiresAt: Date;
}

export interface I_LoginRequest {
  email?: string;
  contactNumber?: string;
  password: string;
}

export interface I_LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    roles: string[];
    permissions: string[];
  };
}

export interface I_Payload {
  id: string;
  roles: string[];
  permissions: string[];
}

export interface I_ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface I_CreatedUser {
  id: string;
  message?: string;
}

export interface I_ForgotPasswordRequest {
  email?: string;
  contactNumber?: string;
}

export interface I_ForgotPasswordResponse {
  resetToken: string;
}

export interface I_UpdateUserByIdRequest {
  email?: string;
  contactNumber?: string;
  roleId: number[];
}

export interface I_ResetPassword {
  password: string;
  confirmPassword: string;
}
