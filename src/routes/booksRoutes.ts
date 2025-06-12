import { Router } from "express";
import { addNewBook, deleteBook, getAllBooks, updateBookk } from "../controllers/booksControllers";

const bookRoute = Router()

bookRoute.get("/", getAllBooks)
bookRoute.post("/", addNewBook)
bookRoute.patch("/:id", updateBookk)
bookRoute.delete("/:id", deleteBook)


export { bookRoute }