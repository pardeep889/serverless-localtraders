# WALLET API

wallet-service

## Getting started

In order to run the services locally, `serverless-offline` plugin is required

## Offline Invocation

```sh
npm install
serverless offline
```

---

## Functions

### Create Wallet

- **URL**: `{{baseURL}}/wallets`
- **METHOD**: `POST`
- **PATH PARAMS**: N/A
- **QUERY PARAMS**: N/A
- **REQUEST BODY**:

```json
{
  "walletName": "kjkljlkj.near"
}
```

- **RESPONSE BODY**:

```json
{
  "message": "wallet created successfully",
  "body": {
    "data": {
      "walletName": "example.near",
      "status": "active"
    }
  }
}
```

### Get Transaction

- **URL**: `{{baseURL}}/wallets/{walletId}`
- **METHOD**: `GET`
- **PATH PARAMS**: walletId
- **QUERY PARAMS**: N/A
- **REQUEST BODY**: N/A
- **RESPONSE BODY**:

```json
{
  "message": "wallet retrieved successfully",
  "body": {
    "data": {
      "userId": "V1StGXR8_Z65dHi6B-myT",
      "walletId": "wafgesh.near",
      "bloackChainStatus": "completed",
      "status": "active",
      "balance": "$ 100",
      "walletHash": "jhfgdcvhjkljkhggfhdfxchvjklnmbvhjfgjbhgfdcvbbmvfh"
    }
  }
}
```

### List Wallet

- **URL**: `{{baseURL}}/transactions/list/{userId}`
- **METHOD**: `GET`
- **PATH PARAMS**: userId
- **QUERY PARAMS**: N/A
- **REQUEST BODY**: N/A
- **RESPONSE BODY**:

```json
{
  "message": "wallets retrieved successfully",
  "body": {
    "data": [
      {
        "userId": "fsagd",
        "walletId": "wallet1.near",
        "bloackChainStatus": "completed",
        "status": "active",
        "balance": "$ 100",
        "walletHash": "jhfgdcvhjkljkhggfhdfxchvjklnmbvhjfgjbhgfdcvbbmvfh"
      },
      {
        "userId": "fsagd",
        "walletId": "wallet2.near",
        "bloackChainStatus": "completed",
        "status": "inactive",
        "balance": "$ 100",
        "walletHash": "sdgbsghfjdxghftjrgfnxbbhvjklnmbvhjfgjbhgfdcvbbmvfh"
      }
    ]
  }
}
```

### Delete Wallet

- **URL**: `{{baseURL}}/transactions/list/{userId}`
- **METHOD**: `DELETE`
- **PATH PARAMS**: walletId
- **QUERY PARAMS**: N/A
- **REQUEST BODY**: N/A
- **RESPONSE BODY**:

```json
{
  "message": "wallet archived successfully",
  "body": {
    "data": {
      "walletId": "example.near",
      "status": "archived"
    }
  }
}
```
