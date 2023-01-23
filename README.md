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
