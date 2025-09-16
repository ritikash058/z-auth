// lib/connection.ts
import { AxiosInstance } from "axios";
import { api } from "./config";

export class ZAuthClient {
    private client: AxiosInstance;
    private baseURL: string;
    private apiKey: string;
    private apiSecretKey: string;

    constructor(config: {
        baseURL: string;
        apiKey: string;
        apiSecretKey: string;
    }) {
        this.baseURL = config.baseURL;
        this.apiKey = config.apiKey;
        this.apiSecretKey = config.apiSecretKey;
        this.client = api(this.baseURL);
    }

    private getHeaders() {
        return {
        apikey: this.apiKey,
        apisecretkey: this.apiSecretKey,
        };
    }
    async get(url: string) {
        return this.client.get(url, { headers: this.getHeaders() });
    }
    
    async post(url: string, data?: any) {
    return this.client.post(url, data, { headers: this.getHeaders() });
    }

    async patch(url: string, data?: any) {
    return this.client.patch(url, data, { headers: this.getHeaders() });
    }

    async delete(url: string) {
    return this.client.delete(url, { headers: this.getHeaders() });
    }

}

export function createConnection(config: {
    baseURL: string;
    apiKey: string;
    apiSecretKey: string;
}) {
    return new ZAuthClient(config);
}