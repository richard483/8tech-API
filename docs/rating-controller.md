# User controller

---

[UserRatingAverageCount](#userRatingAverageCount)

## get user rating average&count (update authorized user)

| Key    | Description   |
| ------ | ------------- |
| Method | `GET`        |
| Path   | `/rating/averageCount/:userId` |

### Success Response

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "_avg": {
      "ratingOf10": 6
    },
    "_count": {
      "ratingOf10": 4
    }
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

### user not found

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "_avg": {
      "ratingOf10": null
    },
    "_count": {
      "ratingOf10": 0
    }
  }
}

```

---

# User controller

---

[CreateUserRating](#createUserRating)

## get user rating average&count (update authorized user)

| Key    | Description   |
| ------ | ------------- |
| Method | `POST`        |
| Path   | `/rating/craete` |

### Request Body

| Key        | Type   |
| ---------- | ------ |
| `userId`    | String |
| `recruiterUserId` | String |
| `ratingOf10` | number |
| `contractId` | String? |

### Success Response

HTTP Code: 200

```json
{
  "status": true,
  "statusCode": 200,
  "data": {
    "id": "de67c8bd-8637-4aa0-9983-31c602896672",
    "userId": "5c03f41e-5c18-4ef2-adf2-9ef560c34ca0",
    "recruiterUserId": "741c71e9-94dc-4ad8-98a6-9259c6b72f88",
    "ratingOf10": 9,
    "createdAt": "2024-01-15T16:16:41.196Z",
    "updatedAt": "2024-01-15T16:16:41.196Z"
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

### invalid field

HTTP Code: 400

```json
{
  "status": false,
  "statusCode": 400,
  "message": {
    "name": "PrismaClientKnownRequestError",
    "code": "P2003",
    "clientVersion": "5.7.1",
    "meta": {
      "modelName": "Rating",
      "field_name": "Rating_userId_fkey (index)"
    }
  },
  "error": "BAD_REQUEST"
}

```