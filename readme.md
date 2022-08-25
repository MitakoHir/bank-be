# Simple Bank nodejs application.

## Capabilities
* Create users with email and password
* Make transactions in order to deposit/withdraw money
* Show list of all transactions made for this account

## Preinstalls
* PostgreSQL
* Node.js >= 13.14.0
* Change `DB_NAME, DB_USER, DB_PASS` values in *src/pre-start/env/development.env* to yours one

## Setup
```bash
npm install
```
## How to use
Firstly you need to compile the code
```bash
npm run build
```
After that you can run compiled code (could be found in *./dist* folder)
```bash
npm run start
```
Express server will be running on 8081 port.


For development purpose it's possible to use, no build step required
```bash
npm run start:dev
```
Express server will be running on 3000 port.

### Tests

To run all test suits once
```bash
npm run test:no-reloading
```
To run all test suits and watch for changes
```bash
npm run test
```

## Available endpoints
Create new user
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "test@email.com","password": "test1234"}' http://localhost:3000/api/auth/register
```
Login with user credentials
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "test@email.com","password": "test1234"}' http://localhost:3000/api/auth/login
```
Once you've logged in with right credentials you'll receive ***Set-Cookie*** header, it will be needed for protected endpoints
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "test@email.com","password": "test1234"}' http://localhost:3000/api/auth/login -vv
* Trying 127.0.0.1:3000...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* Connected to localhost (127.0.0.1) port 3000 (#0)
> POST /api/auth/login HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.84.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 56
>
} [56 bytes data]
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Set-Cookie: accessToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0ZW1haWxAZXhhbXBsZS5jb20iLCJpYXQiOjE2NjE0Njc2MzAsImV4cCI6MTY2MTcyNjgzMH0.0BlD2cnWCmAAywJHji01SFIGI3H4F-42ZOmW16cQM6c.YhPsddFm%2FCgAecDm21Lb05RzbKo68%2B10VJOgcW%2F%2BBRk; Max-Age=259200; Domain=localhost; Path=/; Expires=Sun, 28 Aug 2022 22:47:10 GMT; HttpOnly
< Date: Thu, 25 Aug 2022 22:47:10 GMT
< Connection: keep-alive
< Content-Length: 0
```
### ***Login Required***
Once you login and has ***Set-Cookie*** value, set it in all further requests

Used ***Postman*** to pass Cookie header in request headers like that:
```bash
| Cookie | accessToken... |
```

In order to make a transaction once you setup Cookie header you can
```bash
POST http://localhost:3000/api/transaction/make
```
*Description - used for making transactions within user balance, user balance can not be less than 0*

#### Request Body
```json
{
  "amount": 100
}
```
In order to get list of all transactions
```bash
GET http://localhost:3000/api/transaction/movements
```

