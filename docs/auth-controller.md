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
    "userName": "Admin",
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
| `userName`       | String |
| `firstName`      | String |
| `lastName`       | String |

### Success Response

HTTP Code: 200

```json
{
  "id": "89edfeb7-0b26-4c88-950a-2216123ec367",
  "email": "asdasdas@gmail.com",
  "userName": "string",
  "firstName": "string",
  "lastName": "string",
  "password": "$2b$10$wxulL2C86NpVTzWMlA9Knu9CVUdasWCwSwaC3tqj/S9ziA/iT9JiW",
  "createdAt": "2023-11-22T17:19:18.472Z",
  "updatedAt": "2023-11-22T17:19:18.472Z",
  "roles": ["USER"],
  "description": null,
  "previousWorkplaceId": [],
  "previousWorkplaceCount": null,
  "ratingsAvg": null,
  "hasGoogleAccount": false
}
```

### Password not match

HTTP Code: 400

```json
{
  "error": "PASSWORD_NOT_MATCH"
}
```

### Email already used

HTTP Code: 400

```json
{
  "error": "EMAIL_ALREADY_USED"
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
  "message": ["firstName must be a string", "firstName should not be empty"],
  "error": "Bad Request"
}
```
