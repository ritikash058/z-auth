# ZAuth

ZAuth is a authentication service for ZLS.

## Installation

```bash
npm install @zls4/z-auth
```

## Usage

### User Service

```javascript
import { createConnection, UserService } from "@zls4/z-auth";

const zAuth = createConnection({
  baseURL: "https://z-auth-stage.zerologicspace.com/api",
  apiKey: "tenant-api-key",
  apiSecretKey: "tenant-api-secret-key",
});

const userService = new UserService(zAuth);

async function example1() {
    const users = await userService.getUserById("paradise-1704caa");
    console.log(users);
}

example1();

Output:

{
  id: 'paradise-86f98b7c5030',
  email: 'stickdemon2043@gmail.com',
  isBlocked: false,
  isEmailVerified: true,
  emailVerificationToken: null,
  emailVerificationTokenExpiresAt: null,
  passwordResetToken: null,
  passwordResetTokenExpiresAt: null,
  tenantId: 5,
  refreshToken: null
} 
```

```javascript
import { createConnection, UserService } from "@zls4/z-auth";

const zAuth = createConnection({
  baseURL: "https://z-auth-stage.zerologicspace.com/api",
  apiKey: "tenant-api-key",
  apiSecretKey: "tenant-api-secret-key",
});

const userService = new UserService(zAuth);

async function example2() {
    const one = "stickdemon2043";
    const two = "Asdf1234!";
    // const users = await userService.getUserById("paradise-1704caa");
    const users = await userService.createUser(one, two);
    console.log(users);
}

example2();

Output:
{ error: 'Must be valid email address.', status: 400 } 
{ error: 'User already exists', status: 400 } 

```
## Usage Function

### User Service

```javascript
createUser(email:string, password:string)
login(email:string, password:string)
forgotPassword(email:string)
getUserById(id: string)
resetPassword(token: string, password:string, confirmPassword:string)
changePassword(id: string, currentPassword:string, newPassword:string, confirmPassword:string)
deleteUserById(id: string)
logout(id: string)
verifyEmail(token: string)

```

### Permissions Service

```javascript
createPermissionByRoleId(module:string,access:string,description?:string)
getAllPermissions()
getPermissionById (id: number)
updatePermissionById (id:number, module:string,access:string,description?:string)
deletePermissionById (id : number)
setPermissionByRoleId (roleId: number, permissionId: number)
```

