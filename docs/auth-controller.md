# Auth controller

---

1. [Login](#login)

## Login

| Key    | Description   |
| ------ | ------------- |
| Method | `POST`        |
| Path   | `/auth/login` |

### Request Body

| Key        | Type   |
| ---------- | ------ |
| `email`    | String |
| `password` | String |

### Success Response

HTTP Code: 200

```json
{
  "user": {
    "id": "4be2319f-489b-4630-b7cf-af0b07670ac0",
    "email": "admin@email.com",
    "username": "Admin",
    "firstName": "",
    "lastName": "",
    "createdAt": "2023-11-18T12:56:18.427Z",
    "updatedAt": "2023-11-22T16:58:08.448Z",
    "roles": ["ADMIN", "USER"],
    "description": null,
    "previousWorkplaceId": [],
    "previousWorkplaceCount": 0,
    "ratingsAvg": 0,
    "hasGoogleAccount": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNGJlMjMxOWYtNDg5Yi00NjMwLWI3Y2YtYWYwYjA3NjcwYWMwIiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJ1c2VyTmFtZSI6IkFkbWluIiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJjcmVhdGVkQXQiOiIyMDIzLTExLTE4VDEyOjU2OjE4LjQyN1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTIyVDE2OjU4OjA4LjQ0OFoiLCJyb2xlcyI6WyJBRE1JTiIsIlVTRVIiXSwiZGVzY3JpcHRpb24iOm51bGwsInByZXZpb3VzV29ya3BsYWNlSWQiOltdLCJwcmV2aW91c1dvcmtwbGFjZUNvdW50IjowLCJyYXRpbmdzQXZnIjowLCJoYXNHb29nbGVBY2NvdW50IjpmYWxzZX0sImlhdCI6MTcwMDY3MjQwMywiZXhwIjoxNzAxMjcyNDAzfQ.PV6-CxNeNpiu8Rr6iZPIht-s_zLccZWOU5SjtmEL29o"
}
```

### Invalid credential

HTTP Code: 401

```json
{
  "error": "INVALID_CREDENTIALS"
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
  "statusCode": 400,
  "message": [
    "email must be an email",
    "email should not be empty",
    "password must be a string",
    "password should not be empty"
  ],
  "error": "Bad Request"
}
```

1. [Register](#register)

## Register

| Key    | Description      |
| ------ | ---------------- |
| Method | `POST`           |
| Path   | `/auth/register` |

### Request Body

| Key              | Type   |
| ---------------- | ------ |
| `email`          | String |
| `password`       | String |
| `repeatPassword` | String |
| `username`       | String |
| `firstName`      | String |
| `lastName`       | String |
| `isRecruiter`       | Boolean? |
| `companyId`       | String? |

### Success Response

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "id": "e712c07f-0d79-43be-a222-4676049fa476",
    "email": "rec@gmail.com",
    "username": "rec",
    "firstName": "rec",
    "lastName": "rec",
    "createdAt": "2024-01-06T14:28:15.249Z",
    "updatedAt": "2024-01-06T14:28:15.249Z",
    "roles": [
      "USER",
      "RECRUITER"
    ],
    "description": null,
    "previousWorkplaceId": [],
    "previousWorkplaceCount": null,
    "ratingsAvg": null,
    "companyId": null,
    "portfolio": [],
    "profilePicture": null,
    "hasGoogleAccount": false
  }
}
```

### Email already used

HTTP Code: 400

```json
{
  "status": false,
  "statusCode": 400,
  "message": "EMAIL_ALREADY_USED",
  "error": "BAD_REQUEST"
}
```

### Username already used

HTTP Code: 400

```json
{
  "status": false,
  "statusCode": 400,
  "message": "USERNAME_ALREADY_USED",
  "error": "BAD_REQUEST"
}
```

### Invalid email format

HTTP Code: 400

```json
{
  "status": false,
  "statusCode": 400,
  "message": [
    {
      "isEmail": "email must be an email"
    }
  ],
  "error": "BAD_REQUEST"
}
```

### Empty field

HTTP Code: 400

```json
{
  "status": false,
  "statusCode": 400,
  "message": {
    "firstName": "firstName must be a string",
    "lastName": "lastName must be a string"
  },
  "error": "BAD_REQUEST"
}
```
