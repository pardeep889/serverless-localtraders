# USERS API

User-service

## Getting started

In order to run the services locally, `serverless-offline` plugin is required

## Offline Invocation

```sh
npm install
serverless offline
```

---

## Functions

### Login

- **URL**: `{{baseURL}}/users/login`
- **METHOD**: `POST`
- **PATH PARAMS**: N/A
- **QUERY PARAMS**: N/A
- **REQUEST BODY**:

```json
{
  "walletId": "user.nearwallet",
  "channelType": "<email or phone>"
}
```

- **RESPONSE BODY**:

```json
{
  "status": true,
  "message": "Code sent on email",
  "channelType": "email"
}
```

### Verify Login

- **URL**: `{{baseURL}}/users/login/verify`
- **METHOD**: `POST`
- **PATH PARAMS**: N/A
- **QUERY PARAMS**: N/A
- **REQUEST BODY**:

```json
{
  "walletId": "user.nearwallet",
  "OTP": 236598
}
```

- **RESPONSE BODY**:

```json
{
  "status": true,
  "message": "login successful!",
  "data": {
    "jwt_access_token": "eyJraWQiOiJmdj......",
    "jwt_id_token": "eyJraWQiOiJSc....",
    "jwt_refresh_token": "eyJjdHkiOiJKV......",
    "user_info": {
      "userId": "ZA8n8ZASUj6IouGQTPIZZ",
      "walletId": "randomuser.near",
      "email": "randomuser.near@test.com",
      "phone": "123456",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

### Get User Details

- **URL**: `{{baseURL}}/users/{{userId}}`
- **METHOD**: `GET`
- **PATH PARAMS**: `userId`
- **QUERY PARAMS**: N/A
- **REQUEST BODY**: N/A
- **RESPONSE BODY**:

```json
{
  "status": true,
  "message": "User retrieved successfully!",
  "data": {
    "user_id": "CCB6wW-S-ZaZOta8JaWUI",
    "wallet_status": "pending",
    "status": "active",
    "created": 1641917876256,
    "full_name": "haaaa Jobs",
    "email": "sjobs@apple.com",
    "wallet_id": "mock.near",
    "phone": "9191878787",
    "verified": false
  }
}
```

### Create User

- **URL**: `{{baseURL}}/users`
- **METHOD**: `POST`
- **PATH PARAMS**: N/A
- **QUERY PARAMS**: N/A
- **REQUEST BODY**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "walletName": "randomUser.near",
  "email": "abc123@gmail.com",
  "phone": "123456789"
}
```

- **RESPONSE BODY**:

```json
{
  "status": true,
  "message": "User created successfully!",
  "data": {
    "jwt_access_token": "eyJraWQiOi.............",
    "jwt_id_token": "eyJraW..........",
    "jwt_refresh_token": "eyJjdH............",
    "user_info": {
      "user_id": "KWNCXqjwZgdVOlq_p4GTS",
      "wallet_status": "pending",
      "status": "active",
      "created": 1642440803928,
      "full_name": "My Random account",
      "email": "john.doe@gmail.com",
      "wallet_id": "randomacc9922229.near",
      "phone": "123456789",
      "verified": false
    }
  }
}
```

### Update User

- **URL**: `{{baseURL}}/users/{{userId}}`
- **METHOD**: `POST`
- **PATH PARAMS**: `userId`
- **QUERY PARAMS**: N/A
- **REQUEST BODY**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "walletName": "randomUser.near",
  "email": "abc123@gmail.com",
  "phone": "123456789"
}
```

- **RESPONSE BODY**:

```json
{
  "status": true,
  "message": "User updated successfully!",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "walletId": "randomUser.near",
    "walletStatus": "",
    "status": "",
    "created": "",
    "lastUpdated": "",
    "email": "abc123@gmail.com",
    "phone": "123456789",
    "verified": true
  }
}
```
