# Company controller

---

1. [Create](#create)

## Create

| Key    | Description   |
| ------ | ------------- |
| Method | `POST`        |
| Path   | `/company/create` |

### Request Body

| Key        | Type   |
| ---------- | ------ |
| `profilePicture`    | String |
| `name` | String |
| `description` | String |

### Success Response

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "id": "652abbcb-bca7-48ab-8b38-b26b9034785c",
    "profilePicture": "https://media.licdn.com/dms/image/C510BAQGbaY9E81O-ww/company-logo_200_200/0/1631422948234/pt_djarum_logo?e=2147483647&v=beta&t=6pLdL92Wu1KG04EAqEKCaRnFNvJNEXef8S3Gzi960eA",
    "name": "Djarum",
    "description": "Djarum ni boss",
    "createdAt": "2024-01-06T15:54:41.246Z",
    "updatedAt": "2024-01-06T15:54:41.246Z"
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
    "name": "name must be a string",
    "description": "description must be a string"
  },
  "error": "BAD_REQUEST"
}
```

---

1. [Update](#update)

## Update

| Key        | Type   |
| ---------- | ------ |
| `id`    | String |
| `profilePicture`    | String |
| `name` | String |
| `description` | String |

### Success Response

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "id": "652abbcb-bca7-48ab-8b38-b26b9034785c",
    "profilePicture": "https://media.licdn.com/dms/image/C510BAQGbaY9E81O-ww/company-logo_200_200/0/1631422948234/pt_djarum_logo?e=2147483647&v=beta&t=6pLdL92Wu1KG04EAqEKCaRnFNvJNEXef8S3Gzi960eA",
    "name": "Djarum aja",
    "description": "Djarum ni boss",
    "createdAt": "2024-01-06T15:54:41.246Z",
    "updatedAt": "2024-01-06T15:57:10.008Z"
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

### Empty field

HTTP Code: 400

```json
{
  "status": false,
  "statusCode": 400,
  "message": {
    "id": "id must be a string"
  },
  "error": "BAD_REQUEST"
}
```