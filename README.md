# **Sleep Tracker API**

Back-end build week project for Sleep Tracker

# **Maintainers**

[@G3Ram](https://github.com/G3Ram)

# **Deployed Backend**

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

# **SUMMARY TABLE OF API ENDPOINTS**

| Table | Method | Endpoint  | Description                                                                                                                                                                                    |
| ----- | ------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| users | POST   | /register | Creates a new `user` profile using the information sent inside the `body` of the request and returns a message along with the new `user` in the `body` of the response.                        |
| users | POST   | /login    | Uses the credentials sent inside the `body` to authenticate the user. On successful login, returns a message with the `user` profile and a JSON Web Token token in the `body` of the response. |

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
