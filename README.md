# Simple CRUD API

💡 To get you own server:

- Clone Repo
- Install packs `npm i`
- For start dev-mode `npm run start:dev`
- For start prod-mode `npm run start:prod`
- For tests `npm test`
- You can use my postman config for fast travelling between requests ([postman.zip](https://github.com/shadowinhaze/nodejs-crud-api/files/8936460/postman.zip))

### Requests:
- **get** `https:localhost:4000/users` => all users
- **post** `https:localhost:4000/users` => add new user with unic id
- **get** `https:localhost:4000/users/${userID}` => get certain user
- **put** `https:localhost:4000/users/${userID}` => update full info of certain user
- **delete** `https:localhost:4000/users/${userID}` => delete certain user

### Warnings:
- ⚡ **PUT** fully replace user information.
- ⚡ **I use 4000 port**, you are welcome to change it in .env file.
- ⚡ Use endpoints without **'api'** word in requests, please!
- ⚡ Database contains one user at the start for example!
