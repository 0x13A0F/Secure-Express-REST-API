# Secure-Express-REST-API

This is a REST Api developed with Node.js ,Express.js, and MongoDB. It includes both Authentication and Authorization
using JWT tokens, it is meant to be as Secure as possible.

### Available Endpoints:

| Auth | Arguments |
|:----:|:-----:|
| POST /api/user/login | username,password |
| POST /api/user/register | email,username,password,confirm_password |


| Users | Arguments |
|:----:|:-----:|
| GET /api/users | x |
| GET /api/user/id | x |


| Post | Arguments |
|:----:|:-----:|
| POST /api/post | title,content,tags,categories |
| PUT /api/post/:id | title,content,tags,categories |
| DELETE /api/post/:id | x |
| GET /api/post/:id | x |
| GET /api/posts | page,tag,category,author_id |


# How to install

1. Clone the repo
2. add your RSA public.key and private.key files in /config
3. add .env file containing the following:
```
DB_URL=mongodb://username:password@host/rest-api
PORT=4000
```
change host,username,password according to your mongodb config
