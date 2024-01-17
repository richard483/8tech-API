# Job controller

---

[Get applicants list](#getApplicants)

## Get Applicants (authorized as user)

| Key    | Description   |
| ------ | ------------- |
| Method | `POST`        |
| Path   | `/job/applicants/:jobId` |

### Request Body (all fields are optional)

| Key        | Type   |
| ---------- | ------ |
| `page`    | number? |
| `size` | number? |

### Success Response

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "a05c4cf9-fac2-4d63-a542-97945bffd0b0",
        "email": "richard.william483@gmail.com",
        "username": "richard__uwu",
        "firstName": "Richard",
        "lastName": "William",
        "password": "$2b$10$Cxot0Ynr0gnSCDGC7wjo4upLoXABsgZ01BUmbqh2tQ7S76sXm3GN6",
        "createdAt": "2024-01-16T08:10:00.242Z",
        "updatedAt": "2024-01-16T08:10:00.876Z",
        "roles": [
          "USER"
        ],
        "description": "default richard description that being created by seed.ts",
        "previousWorkplaceId": [
          "7b9e79f7-ebc1-49de-a0db-b9d53cfe1cf7",
          "84d98c27-d50a-4deb-b4be-446dbe342598",
          "ff567d29-8dea-4de9-a24d-6affa42f50c8"
        ],
        "previousWorkplaceCount": 3,
        "ratingsAvg": null,
        "companyId": null,
        "portfolio": [],
        "profilePicture": null,
        "hasGoogleAccount": false
      },
      {
        "id": "d433d551-64ed-40f1-b799-4c3499bd093c",
        "email": "default.user@email.com",
        "username": "Default User",
        "firstName": "Default",
        "lastName": "User",
        "password": "$2b$10$5R7ho.XC03csXn3NrbjHKOxN.P0JrHjbIUD8BsM3Dgb7T0Xo40JOa",
        "createdAt": "2024-01-16T08:10:00.313Z",
        "updatedAt": "2024-01-16T08:10:00.875Z",
        "roles": [
          "USER"
        ],
        "description": "default user description that being created by seed.ts",
        "previousWorkplaceId": [
          "7b9e79f7-ebc1-49de-a0db-b9d53cfe1cf7",
          "84d98c27-d50a-4deb-b4be-446dbe342598",
          "ff567d29-8dea-4de9-a24d-6affa42f50c8"
        ],
        "previousWorkplaceCount": 3,
        "ratingsAvg": null,
        "companyId": null,
        "portfolio": [],
        "profilePicture": null,
        "hasGoogleAccount": false
      },
      {
        "id": "d433d551-64ed-40f1-b799-4c3499bd093c",
        "email": "default.user@email.com",
        "username": "Default User",
        "firstName": "Default",
        "lastName": "User",
        "password": "$2b$10$5R7ho.XC03csXn3NrbjHKOxN.P0JrHjbIUD8BsM3Dgb7T0Xo40JOa",
        "createdAt": "2024-01-16T08:10:00.313Z",
        "updatedAt": "2024-01-16T08:10:00.875Z",
        "roles": [
          "USER"
        ],
        "description": "default user description that being created by seed.ts",
        "previousWorkplaceId": [
          "7b9e79f7-ebc1-49de-a0db-b9d53cfe1cf7",
          "84d98c27-d50a-4deb-b4be-446dbe342598",
          "ff567d29-8dea-4de9-a24d-6affa42f50c8"
        ],
        "previousWorkplaceCount": 3,
        "ratingsAvg": null,
        "companyId": null,
        "portfolio": [],
        "profilePicture": null,
        "hasGoogleAccount": false
      },
      {
        "id": "d433d551-64ed-40f1-b799-4c3499bd093c",
        "email": "default.user@email.com",
        "username": "Default User",
        "firstName": "Default",
        "lastName": "User",
        "password": "$2b$10$5R7ho.XC03csXn3NrbjHKOxN.P0JrHjbIUD8BsM3Dgb7T0Xo40JOa",
        "createdAt": "2024-01-16T08:10:00.313Z",
        "updatedAt": "2024-01-16T08:10:00.875Z",
        "roles": [
          "USER"
        ],
        "description": "default user description that being created by seed.ts",
        "previousWorkplaceId": [
          "7b9e79f7-ebc1-49de-a0db-b9d53cfe1cf7",
          "84d98c27-d50a-4deb-b4be-446dbe342598",
          "ff567d29-8dea-4de9-a24d-6affa42f50c8"
        ],
        "previousWorkplaceCount": 3,
        "ratingsAvg": null,
        "companyId": null,
        "portfolio": [],
        "profilePicture": null,
        "hasGoogleAccount": false
      },
      {
        "id": "d433d551-64ed-40f1-b799-4c3499bd093c",
        "email": "default.user@email.com",
        "username": "Default User",
        "firstName": "Default",
        "lastName": "User",
        "password": "$2b$10$5R7ho.XC03csXn3NrbjHKOxN.P0JrHjbIUD8BsM3Dgb7T0Xo40JOa",
        "createdAt": "2024-01-16T08:10:00.313Z",
        "updatedAt": "2024-01-16T08:10:00.875Z",
        "roles": [
          "USER"
        ],
        "description": "default user description that being created by seed.ts",
        "previousWorkplaceId": [
          "7b9e79f7-ebc1-49de-a0db-b9d53cfe1cf7",
          "84d98c27-d50a-4deb-b4be-446dbe342598",
          "ff567d29-8dea-4de9-a24d-6affa42f50c8"
        ],
        "previousWorkplaceCount": 3,
        "ratingsAvg": null,
        "companyId": null,
        "portfolio": [],
        "profilePicture": null,
        "hasGoogleAccount": false
      }
    ],
    "hasPrevious": false,
    "hasNext": true,
    "totalPages": 6,
    "isLast": false,
    "isFirst": true
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

### Empty body

HTTP Code: 400

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "hasPrevious": false,
    "hasNext": false,
    "totalPages": null,
    "isLast": false,
    "isFirst": true
  }
}

```
---
[Apply Job](#applyJob)

## Apply Job (authorized as user)

| Key    | Description      |
| ------ | ---------------- |
| Method | `GET`           |
| Path   | `/job/apply/:jobId` |


### Success Response

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "id": "7c7e2bac-415d-4f3b-8125-814684a78cdd",
    "userId": "3f016730-07ae-4ef6-88f1-1fc3ce57008e",
    "jobId": "e00b4d7f-19c1-40f7-8e96-895dcd9b6f0e",
    "paymentId": null,
    "title": "This is job1 title for 3f016730-07ae-4ef6-88f1-1fc3ce57008e",
    "description": "Contract for the following job description: This is job1 description for ninisani",
    "paymentRate": null,
    "template": null,
    "createdAt": "2024-01-16T09:46:53.601Z",
    "updatedAt": "2024-01-16T09:46:53.601Z",
    "status": "PENDING",
    "customField": null,
    "workSubmission": null,
    "ratingId": null
  }
}
```

### Unauthorized

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

### Job not found

HTTP Code: 401

```json
{
  "status": false,
  "statusCode": 418,
  "message": {
    "jobId": "NOT_FOUND"
  },
  "error": "INTERNAL_SERVER_ERROR"
}
```

### User already applied for the job

HTTP Code: 400

```json
{
  "status": false,
  "statusCode": 400,
  "message": {
    "jobId": "USER_ALREADY_APPLIED"
  },
  "error": "BAD_REQUEST"
}
```
