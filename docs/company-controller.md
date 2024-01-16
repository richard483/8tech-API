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
| Key    | Description   |
| ------ | ------------- |
| Method | `POST`        |
| Path   | `/company/update` |


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

---

1. [GetInfo](#getInfo)

## Get Info

| Key    | Description   |
| ------ | ------------- |
| Method | `POST`        |
| Path   | `/info/:companyId` |

### Success Response

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "id": "7b9e79f7-ebc1-49de-a0db-b9d53cfe1cf7",
    "profilePicture": null,
    "name": "Nijisanji Anycolor",
    "description": "Nijisanji is a VTuber agency under Ichikara Inc. While the company is based in Japan, it also has branches in China, Indonesia, South Korea, and India.",
    "createdAt": "2024-01-16T08:09:59.992Z",
    "updatedAt": "2024-01-16T08:09:59.992Z"
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

### no data

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": null
}
```