import { Router } from "express";
import { postBook, getBooks, getBookById, updateBookById, deleteBookById } from "../controller/books-controller.js"

const router = Router()

router.post("/book", postBook)
router.get("/books", getBooks)
router.get("/book/:id", getBookById)
router.put("/book/:id", updateBookById)
router.delete("/book/:id", deleteBookById)

export default router