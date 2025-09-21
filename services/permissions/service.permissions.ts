import { ZAuthClient, validateRequest } from "../../lib/connection";
import { createPermissionValidator, updatePermissionValidator, setPermissionValidator } from "./validator.permissions";

export class PermissionsService {
    private client:ZAuthClient

    constructor(client:ZAuthClient){
        this.client = client
    }

    async createPermission(module:string,access:string,description?:string){
        try {
            await validateRequest(createPermissionValidator,{module,access,description})
            const response = await this.client.post("/permissions",{module,access,description})
            return response.data
        } catch (error:any) {
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

    async getAllPermissions() {
        try {
            const response = await this.client.get("/permissions")
            return response.data
        } catch (error:any) {
            return {
                error: error.response?.data || error.message,
                status: error.response?.status || 500,
            }
        }
    }

    async getPermissionById (id: number) {
        try {
            const response = await this.client.get(`/permissions/${id}`)
            return response.data
        } catch (error:any) {
            return {
                error: error.response?.data || error.message,
                status: error.response?.status || 500,
            }
        }
    }

    async updatePermissionById (id:number, module:string,access:string,description?:string) {
        try {
            await validateRequest(updatePermissionValidator,{module,access,description})
            const response = await this.client.patch(`/permissions/${id}`,{module,access,description})
            return response.data
            
        } catch (error:any) {
            if (Array.isArray(error)) {
                return {
                    error: error.join(', '),
                    status: 400,
                };
            }
            return {
                error: error.response?.data || error.message,
                status: error.response?.status || 500,
            }
        }
    }

    async deletePermissionById (id : number) {
        try {
            const response = await this.client.delete(`/permissions/${id}`)
            return response.data
        } catch (error:any) {
            return {
                error: error.response?.data || error.message,
                status: error.response?.status || 500,
            }
        }
    }

    async setPermissionByRoleId (roleId: number, permissionId: number[]) {
        try {
            await validateRequest(setPermissionValidator,{roleId,permissionId})
            const response = await this.client.patch(`/permissions/set-permission/${roleId}`,{permissionId})
            return response.data
        } catch (error:any) {
            if (Array.isArray(error)) {
                return {
                    error: error.join(', '),
                    status: 400,
                };
            }
            return {
                error: error.response?.data || error.message,
                status: error.response?.status || 500,
            }
        }
    }

    async setAllPermissions(roleId:number) {
        try {
            const response = await this.client.patch(`/permissions/set-all-permission/${roleId}`)
            return response.data
        } catch (error:any) {
            return {
                error: error.response?.data || error.message,
                status: error.response?.status || 500,
            }
        }
    }
}