# Contract controller

---

1. [Create](#create)

## Login

| Key    | Description   |
| ------ | ------------- |
| Method | `POST`        |
| Path   | `/contract/create` |

### Request Body

| Key        | Type   |
| ---------- | ------ |
| `userId`    | String |
| `jobId` | String |
| `title` | String |
| `description` | String |
| `paymentRate` | String |
| `paymentRequestId` | String? |
| `template` | String? |
| `customField` | String? (must be separated by ';' symbol & each field separated by '=' symbol)|

### Success Response

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "id": "5ace7c9c-097c-46f3-98e0-21a6caa76771",
    "userId": "88862b00-d3d3-4d4b-8183-d7840dad654e",
    "jobId": "242c4095-cafe-499b-ba64-996085c4a247",
    "paymentId": null,
    "title": "this is title of contract",
    "description": "this is description for created contract",
    "paymentRate": 100000,
    "template": null,
    "createdAt": "2024-01-05T04:19:32.139Z",
    "updatedAt": "2024-01-05T04:19:32.139Z",
    "status": "PENDING",
    "customField": null
  }
}
```

### Invalid credential

HTTP Code: 401

```json
{
  "status": true,
  "statusCode": 401,
  "data": {
    "access": "UNAUTHORIZED"
  }
}
```

### Invalid email format

HTTP Code: 400

```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

### Empty field

HTTP Code: 400

```json
{
  "status": false,
  "statusCode": 400,
  "message": {
    "userId": "userId must be a string",
    "jobId": "jobId must be a string",
    "title": "title must be a string",
    "description": "description must be a string",
    "paymentRate": "paymentRate must be a number conforming to the specified constraints"
  },
  "error": "BAD_REQUEST"
}
```
