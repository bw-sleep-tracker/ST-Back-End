# **Sleep Tracker API**

Back-end build week project for Sleep Tracker

# **Maintainers**

[@G3Ram](https://github.com/G3Ram)

# **Deployed Backend**

- https://be-bw-sleep-tracker.herokuapp.com/ (Testing)
- https://bw-sleep-tracker-app.herokuapp.com/ (Production)

# **Technologies**

#### Production

- [Express](https://www.npmjs.com/package/express): `Fast, unopinionated, minimalist web framework for Node.js`
- [Bcryptjs](https://www.npmjs.com/package/body-parser): `Allows you to store passwords securely in your database`
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): `Generate and verify json web tokens to maintain a stateless api`
- [Knex](https://www.npmjs.com/package/knex): `Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use`
- [Knex-cleaner](https://www.npmjs.com/package/knex-cleaner): `Helper library to clean a PostgreSQL, MySQL or SQLite3 database tables using Knex`
- [Pg](https://www.npmjs.com/package/pg): `Non-blocking PostgreSQL client for Node.js.`
- [Sqlite3](https://www.npmjs.com/package/sqlite3): `Asynchronous, non-blocking SQLite3 bindings for Node.js.`
- [Cors](https://www.npmjs.com/package/cors): `CORS is a Node.js package for providing a Connect/Express middleware that can be used to enable CORS`
- [Helmet](https://www.npmjs.com/package/helmet): `Helmet helps you secure your Express apps by setting various HTTP headers`
- [Dotenv](https://www.npmjs.com/package/dotenv): `Dotenv is a zero-dependency module that loads environment variables from a .env file`

#### Development

- [Nodemon](https://www.npmjs.com/package/nodemon): `nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected`

# Set-up

(# <--- signifies comment)

In your terminal run:

```
# Install dependencies
npm install

# Starts express server using nodemon
npm run server
```

# **Table of Contents**

- [Summary Table of API Endpoints](#summary-table-of-api-endpoints)
- [Auth Routes](#auth-routes)
  - [Register User](#register)
  - [Login User](#login)
- [User Routes](#user-routes)
  - [Update User](#update-user)
- [Tracker Routes](#tracker-routes)
  - [Get tracker with userid](#get-tracker-with-userid)
  - [Get tracker for a month](#get-tracker-for-a-month)
  - [Get tracker for a year](#get-tracker-for-a-year)
  - [Get tracker for days](#get-tracker-for-days)
  - [Add tracker](#add-tracker)
  - [Update tracker](#udpate-tracker)
  - [Delete tracker](#delete-tracker)
  - [Get tracker with userid and date](#get-tracker-with-userid-and-date)
- [Recommendation Routes](#recommendation-routes)
  - [Get all recommendations for userid](#get-all-recommendations-for-userid)
  - [Get recommendation for user for month](#get-recommendation-for-user-for-month)
  - [Add recommendation for user for month](#add-recommendation-for-user-for-month)
  - [Update recommendation for user for month](#update-recommendation-for-user-for-month)
  - [Delete recommendation for user for month](#delete-recommendation-for-user-for-month)
- [Logout](#logout)

# **SUMMARY TABLE OF API ENDPOINTS**

| Table          | Method | Endpoint                                    | Description                                                                                                                                                                                                     |
| -------------- | ------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| users          | POST   | /register                                   | Creates a new `user` profile using the information sent inside the `body` of the request and returns a message along with the new `user` in the `body` of the response.                                         |
| users          | POST   | /login                                      | Uses the credentials sent inside the `body` to authenticate the user. On successful login, returns a message with the `user` profile and a JSON Web Token token in the `body` of the response.                  |
| users          | PUT    | /user/:id                                   | The user will be able to update his settings after successful login. JSON web token should be available in the headers (Authorization)                                                                          |
| tracker        | GET    | /tracker/:id                                | Gets all the tracker information for the user id passed in the request parameters. The response will contain all the tracking information for the user sorted descending. The latest information will be first. |
| tracker        | POST   | /tracker                                    | Uses the tracker object sent inside the `body` to add the tracker information.                                                                                                                                  |
| tracker        | GET    | /tracker/:id/month/:month                   | Uses the user id and month provided in the request parameters to retrieve all the tracking information for the user for a particular month                                                                      |
| tracker        | GET    | /tracker/:id/year/:year                     | Uses the user id and year provided in the request parameters to retrieve all the tracking information for the user for a particular year                                                                        |
| tracker        | GET    | /tracker/:id/limit/:limit/order/:order      | Uses the user id, limit and order details provided in the request to retrieve all the tracking information for a user. It would get only the number of items set in the limit. The order can be `asc` or `desc` |
| tracker        | PUT    | /tracker                                    | Uses the tracker object sent inside the `body` to update the tracking information                                                                                                                               |
| tracker        | DELETE | /tracker/:id/date/:date/year:year           | Uses the id, date and year passed in the request parameter to delete the particular tracking information                                                                                                        |
| tracker        | GET    | /tracker/:id/date/:date                     | Uses the user id and date in the request to retrieve the particular tracking information                                                                                                                        |
| tracker        | GET    | /user                                       | Gets all the users in the system                                                                                                                                                                                |
| recommendation | POST   | /recommendation                             | Uses the recommondation object in the `body` of the request to create a new recommendation                                                                                                                      |
| recommendation | GET    | /recommendation/:id                         | Gets all the recommendation available for a user based on the user id passed in the parameter                                                                                                                   |
| recommendation | GET    | /recommendation/:id/month/:month/year/:year | Gets all the recommendation for a user for a particular month and year                                                                                                                                          |
| recommendation | PUT    | /recommendation                             | Updates the recommendation based on the recommendation object passed in the `body`                                                                                                                              |
| recommendation | DELETE | /recommendation/:id/month/:month/year/:year | Deletes the recommendation for a user for that particular month and year                                                                                                                                        |
| tracker        | GET    | /tracker/:id/yearall/:year                  | Gets all the tracker information for year including the partially submitted records (having an emotion status of 5)                                                                                             |

# Auth Routes

## **Register**

### **Registers a user\***

_Method Url:_ `/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name         | type   | required | description    |
| ------------ | ------ | -------- | -------------- |
| `username`   | String | Yes      | Must be unique |
| `password`   | String | Yes      |                |
| `email`      | String | Yes      |                |
| `first_name` | String | Yes      |                |
| `last_name`  | String | Yes      |                |

_example:_

```
{
	"username":"g3ram",
	"password":"password",
	"email":"g3ram@att.net",
	"first_name":"Gayathri",
	"last_name":"Ramakrishnan"
}
```

#### Response

##### 201 (Created)

> If you successfully register a user the endpoint will return an HTTP response with a status code `201` and a body as below.

_example:_

```

{
    "user": {
        "id": 3,
        "username": "g3ram",
        "password": "$2a$10$HXnXHP6WY8HEArAKXvNuh.KLFs5hBkqIOeWFycRCu3.Dhb4wt5ae.",
        "email":"g3ram@att.net",
        "first_name":"Gayathri",
        "last_name":"Ramakrishnan"
    }
}

```

##### 400 (Bad Request)

> If you are missing any of the fields for registration, the endpoint will return an HTTP response with a status code `400` and a body as below.

_example:_

```
{
    "message": "Please enter all the necessary credentials to register."
}

```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while registering"
}

```

---

## _Login_

### **Logs a user in**

_Method Url:_ `/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description                                                           |
| ---------- | ------ | -------- | --------------------------------------------------------------------- |
| `username` | String | Yes      | Must match a username in the database                                 |
| `password` | String | Yes      | Must match a password in the database corresponding to username above |

_example:_

```

{
	"username":"g3ram",
	"password":"password"
}

```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
    "message": "g3ram is successfully logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3R1c2VyMSIsImlhdCI6MTU2MTMwNzAxOCwiZXhwIjoxNTYxMzkzNDE4fQ.uLuolcq01gufwrjUTbm0ecR8fjYJgWuou--ja3DKwOE"
}

```

##### 400 (Bad Request)

> If you are missing a email or password for login, the endpoint will return an HTTP response with a status code `400` and a body as below.

_example:_

```

{
  "message": "Submit both an username and password when registering"
}

```

##### 401 (Unauthorized)

> If you failt to login, the endpoint will return an HTTP response with a status code `401` which indicates the username and or password entered is not valid.

_example:_

```

{
  message: "Sorry, incorrect email or password."
}

```

##### 500 (Bad Request)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while logging in."
}

```

# User routes

## **UPDATE USER**

### **Update a user by user id**

_Method Url:_ `/user/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description           |
| ---- | ------- | -------- | --------------------- |
| id   | Integer | Yes      | ID of a specific user |

#### Body

| name         | type   | required | description    |
| ------------ | ------ | -------- | -------------- |
| `username`   | String | Yes      | Must be unique |
| `password`   | String | Yes      |                |
| `email`      | String | Yes      |                |
| `first_name` | String | Yes      |                |
| `last_name`  | String | Yes      |                |

_example:_

```

{
	"username":"g3ram",
	"password":"password",
	"email":"g3ram@verizon.net",
	"first_name":"Tester_firstName",
	"last_name":"Tester_lastName"
}

```

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is updated successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
    "id": 4,
    "username": "g3ram",
    "password": "password",
    "email": "g3ram@verizon.net",
    "first_name": "Tester_firstName",
    "last_name": "Tester_lastName"
}

```

#### 404 (Not Found)

> If the user profile for the specified id can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, but that profile doesn't exist"
}

```

#### 400 (Bad Request)

> If you are missing any of the required field(s) - userId or user object(user object should have atleast email or first name or last name), the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "UserId or User object missing."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while updating the user information."
}

```

# Tracker routes

## **GET TRACKER WITH USERID**

### **Get all the tracking information for a user **

_Method Url:_ `/tracker/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description           |
| ---- | ------- | -------- | --------------------- |
| id   | Integer | Yes      | ID of a specific user |

#### Body

No information is passed in the body

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is available in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

[
{
"user_id": 4,
"date": "06/21/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 21
},
{
"user_id": 4,
"date": "06/22/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
},
{
"user_id": 4,
"date": "06/23/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
},
{
"user_id": 4,
"date": "06/24/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
}
]

```

#### 404 (Not Found)

> If the user profile for the specified id can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, unable to retrieve information for this user id."
}

```

#### 400 (Bad Request)

> If you are missing any of the required field(s) - userId , the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "The required user id is not available in the request parameters."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
}

```

## **GET TRACKER FOR A MONTH**

### **Get all the tracking information for a user for a particular month**

_Method Url:_ `/tracker/:id/month/:month`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description           |
| ---- | ------- | -------- | --------------------- |
| id   | Integer | Yes      | ID of a specific user |

#### Body

No information is passed in the body

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is available in the database, all the tracking information for that user for that month will be retrieved. The endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

[
{
"user_id": 4,
"date": "06/21/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 21
},
{
"user_id": 4,
"date": "06/22/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
},
{
"user_id": 4,
"date": "06/23/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
},
{
"user_id": 4,
"date": "06/24/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
}
]

```

#### 404 (Not Found)

> If the user profile for the specified id can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, unable to retrieve information for this user id."
}

```

#### 400 (Bad Request)

> If you are missing any of the required field(s) - userId , the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "The required user id or month is not available in the request parameters."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
}

```

## **GET TRACKER FOR A YEAR**

### **Get all the tracking information for a user for a particular year**

_Method Url:_ `/tracker/:id/year/:year`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description           |
| ---- | ------- | -------- | --------------------- |
| id   | Integer | Yes      | ID of a specific user |

#### Body

No information is passed in the body

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is available in the database, all the tracking information for that user for that year will be retrieved. The endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

[
{
"user_id": 4,
"date": "06/21/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 21
},
{
"user_id": 4,
"date": "06/22/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
},
{
"user_id": 4,
"date": "06/23/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
},
{
"user_id": 4,
"date": "06/24/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
}
]

```

#### 404 (Not Found)

> If the user profile for the specified id can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, unable to retrieve information for this user id."
}

```

#### 400 (Bad Request)

> If you are missing any of the required field(s) - userId , the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "The required user id or year is not available in the request parameters."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
}

```

## **GET TRACKER FOR DAYS**

### **Get all the tracking information for a user for a particular set of days in asc or desc order**

_Method Url:_ `/tracker/:id/limit/:limit/order/:order`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description           |
| ---- | ------- | -------- | --------------------- |
| id   | Integer | Yes      | ID of a specific user |

#### Body

No information is passed in the body

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is available in the database, all the tracking information for that user will be retrieved. limit (Should be set to the number of records) and order (should be set to 'asc' or 'desc'). The endpoint will return an HTTP response with a status code `200` and a body as below. In the example below - limit is set to 2 and order is 'asc'

_example:_

```

[
{
"user_id": 4,
"date": "06/21/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 21
},
{
"user_id": 4,
"date": "06/22/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 23
}
]

```

#### 404 (Not Found)

> If the user profile for the specified id can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, unable to retrieve information for this user id."
}

```

#### 400 (Bad Request)

> If you are missing any of the required field(s) - userId , the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "The required user id or limit or order is not available in the request parameters."
}

```

> The following message will be displayed if invalid value is passed for limit or order.

```

{
  "message":The limit value or the order value in the request parameter is not valid.
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
}

```

## **ADD TRACKER**

### **Add a tracking information for the user**

_Method Url:_ `/tracker/`

_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name               | type    | required | description    |
| ------------------ | ------- | -------- | -------------- |
| `user_id`          | String  | Yes      | Must be unique |
| `date`             | String  | Yes      |                |
| `start_sleep_time` | String  | Yes      |                |
| `end_sleep_time`   | String  | Yes      |                |
| `day_emotion`      | String  | Yes      |                |
| `sleep_emotion`    | Integer | Yes      |                |
| `month`            | Integer | Yes      |                |
| `year`             | Integer | Yes      |                |
| `day`              | Integer | Yes      |                |

_example:_

```

{
	"user_id":4,
	"date":"06/25/2019",
	"start_sleep_time":"22:00",
	"end_sleep_time":"06:00",
	"day_emotion":4,
	"sleep_emotion":3,
	"month":6,
	"day":20,
	"year":2019
}

```

#### Response

##### 200 (OK)

> If a tracking info for the user is added successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
    "user_id": 4,
    "date": "06/25/2019",
    "start_sleep_time": "22:00",
    "end_sleep_time": "06:00",
    "day_emotion": 4,
    "sleep_emotion": 3,
    "month": 6,
    "year": 2019,
    "day": 20
}

```

#### 400 (Bad Request)

> If you are missing the tracking information in the request body, the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "Missing tracker information."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to add the tracking information."
}

```

## **UPDATE TRACKER**

### **Update a tracking information for the user**

_Method Url:_ `/tracker/`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name               | type    | required | description    |
| ------------------ | ------- | -------- | -------------- |
| `user_id`          | String  | Yes      | Must be unique |
| `date`             | String  | Yes      |                |
| `start_sleep_time` | String  | No       |                |
| `end_sleep_time`   | String  | No       |                |
| `day_emotion`      | String  | No       |                |
| `sleep_emotion`    | Integer | No       |                |
| `month`            | Integer | No       |                |
| `year`             | Integer | No       |                |
| `day`              | Integer | No       |                |

_example:_

```

{
	"user_id":4,
	"date":"06/25/2019",
	"end_sleep_time":"06:00",
	"day_emotion":3,
  "day":25
}

```

#### Response

##### 200 (OK)

> If a tracking info for the user is udpated successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
    "user_id": 4,
    "date": "06/25/2019",
    "start_sleep_time": "22:00",
    "end_sleep_time": "06:00",
    "day_emotion": 3,
    "sleep_emotion": 3,
    "month": 6,
    "year": 2019,
    "day": 25
}

```

#### 404 (Not Found)

> If the tracking information for the specified user and date can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "The tracker information requested to update cannot be found."
}

```

#### 400 (Bad Request)

> If you are missing the tracking information in the request body, the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "Tracker is missing userId or date for update."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to update the tracker details for the user."
}

```

## **DELETE TRACKER**

### **Deleting a tracking information for the user**

_Method Url:_ `/tracker/:id/date/:date`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If a tracking info for the user is deleted successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
  "message":"Tracker info successfully deleted."
}

```

#### 404 (Not Found)

> If the tracking information for the specified user and date can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "The tracker information requested to update cannot be found."
}

```

#### 400 (Bad Request)

> If you are missing the tracking information in the request parameter, the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "The userid or date request parameter is missing."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to delete the tracker details for the user."
}

```

## **GET TRACKER WITH USERID AND DATE**

### **Get all the tracking information for a user for a particular date**

_Method Url:_ `/tracker/:id/date/:date`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description           |
| ---- | ------- | -------- | --------------------- |
| id   | Integer | Yes      | ID of a specific user |
| date | String  | Yes      |                       |

#### Body

No information is passed in the body

#### Response

##### 200 (OK)

> If a user with the specified ID and the date in the URL parameters is available in the database, all the tracking information for that user for that date will be retrieved. The endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```


{
"user_id": 4,
"date": "06/21/2019",
"start_sleep_time": "22:00",
"end_sleep_time": "06:00",
"day_emotion": 4,
"sleep_emotion": 3,
"month": 6,
"year": 2019,
"day": 21
}

```

#### 404 (Not Found)

> If the user profile for the specified id can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, unable to retrieve information for this user id."
}

```

#### 400 (Bad Request)

> If you are missing any of the required field(s) - userId , the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "The id or date is missing in request parameters."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
}

```

# Recommendation Routes

## **GET ALL RECOMMENDATIONS FOR A USERID**

### **Get all the tracking information for a user**

_Method Url:_ `/recommendation/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description           |
| ---- | ------- | -------- | --------------------- |
| id   | Integer | Yes      | ID of a specific user |

#### Body

No information is passed in the body

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is available in the database, all the recommendation information for that user will be retrieved. The endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```


[
    {
        "user_id": 4,
        "month": 3,
        "year": 2019,
        "recommendation": "No data available for this time period."
    },
    {
        "user_id": 4,
        "month": 5,
        "year": 2019,
        "recommendation": "No data available for this time period"
    },
    {
        "user_id": 4,
        "month": 6,
        "year": 2019,
        "recommendation": "Very well slept!"
    }
]

```

#### 404 (Not Found)

> If the user profile for the specified id can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, unable to retrieve information for this user id."
}

```

#### 400 (Bad Request)

> If you are missing any of the required field(s) - userId , the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "The id is missing in request parameters."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to retrieve the recommendation details for the user."
}

```

## **GET RECOMMENDATION FOR USER FOR MONTH**

### **Get all the recommendation information for a user for a particular month**

_Method Url:_ `/recommendation/:id/month/:month/year/:year`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name  | type    | required | description           |
| ----- | ------- | -------- | --------------------- |
| id    | Integer | Yes      | ID of a specific user |
| month | Integer | Yes      |                       |
| year  | Integer | Yes      |                       |

#### Body

No information is passed in the body

#### Response

##### 200 (OK)

> If a user with the specified ID and the date in the URL parameters is available in the database, all the tracking information for that user for that date will be retrieved. The endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
    "user_id": 4,
    "month": 6,
    "year": 2019,
    "recommendation": "Very well slept!"
}

```

#### 404 (Not Found)

> If the user profile for the specified id can't be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, unable to retrieve information for this user id."
}

```

#### 400 (Bad Request)

> If you are missing any of the required field(s) - userId , the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "The id or date is missing in request parameters."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to retrieve the recommendation details for the user."
}

```

## **ADD RECOMMENDATION**

### **Add a recommendation information for the user**

_Method Url:_ `/recommendation/`

_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name             | type    | required | description    |
| ---------------- | ------- | -------- | -------------- |
| `user_id`        | String  | Yes      | Must be unique |
| `month`          | Integer | Yes      |                |
| `year`           | Integer | Yes      |                |
| `recommendation` | String  | Yes      |                |

_example:_

```

{
	"user_id":4,
	"month":4,
	"year":2019,
	"recommendation":"No data available for this time period"
}

```

#### Response

##### 200 (OK)

> If a tracking info for the user is added successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
	"user_id":4,
	"month":4,
	"year":2019,
	"recommendation":"No data available for this time period"
}

```

#### 400 (Bad Request)

> If you are missing the tracking information in the request body, the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "Missing recommendation information in request body."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to add the recommendation information."
}

```

## **UPDATE RECOMMENDATION**

### **Update a tracking information for the user**

_Method Url:_ `/recommendation/`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name             | type    | required | description    |
| ---------------- | ------- | -------- | -------------- |
| `user_id`        | String  | Yes      | Must be unique |
| `month`          | Integer | Yes      |                |
| `year`           | Integer | Yes      |                |
| `recommendation` | String  | Yes      |                |

_example:_

```

{
	"user_id":4,
	"month":4,
	"year":2019,
	"recommendation":"No data available for this time period.!!!"
}

```

#### Response

##### 200 (OK)

> If a tracking info for the user is udpated successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
    "user_id": 4,
    "month": 4,
    "year": 2019,
    "recommendation": "No data available for this time period.!!!"
}

```

#### 400 (Bad Request)

> If you are missing the tracking information in the request body, the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "Recommendation to be updated is missing in request parameter."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to update the tracker details for the user."
}

```

## **DELETE RECOMMENDATION**

### **Deleting a recommendation information for the user**

_Method Url:_ `/recommendation/:id/month/:month/year/:year`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If a tracking info for the user is deleted successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
  "message":"The Recommendation was deleted successfully."
}

```

#### 400 (Bad Request)

> If you are missing the tracking information in the request parameter, the endpoint will return an HTTP response with a status code `400` and a body as below relating to the missing field(s).

_example:_

```

{
  "message": "The request parameters - userId, year and month are missing."
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while trying to delete the recommendation details for the user."
}

```

# Logout

## **Logout**

### **Logs the user out of the application\***

_Method Url:_ `/logout`

_HTTP method:_ **[GET]**

#### Destroys the user's current session.
