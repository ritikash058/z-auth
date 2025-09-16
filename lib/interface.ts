export interface Tenant {
    name: string;
    apiKey: string;
    apiSecretKey: string;
    redirectUrl: string | null;
}

export interface User {
    apiKey: string | null;
    apiSecretKey: string | null;
    email: string;
    password: string;
}

export interface ChangePassword {
    apiKey: string;
    apiSecretKey: string;
    newPassword: string;
    confirmPassword: string;
    currentPassword: string | null;
}