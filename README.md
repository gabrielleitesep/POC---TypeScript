# POC - TypeScript
Proof of concept about TypeScript CRUD, based on a bookstore project



# API Documentation
POST: "/book
Body: {
    "title": Required string
    "author": Required string.
}
----------------------------------
GET: "/books"
----------------------------------
GET: "/book/:id"
----------------------------------
PUT: "/book/:id"
Body: {
    "title": Required string
    "author": Required string.
}
----------------------------------
DELETE: "/book/:id"
----------------------------------



# Installation
1- Run npm install.
2- Create a Postgres database.
3- Create the .env file with the .env.example according informations.
4- Run npm run dev.