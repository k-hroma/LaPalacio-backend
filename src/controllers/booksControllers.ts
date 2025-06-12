import { QueryResponse } from "../types/ConnectionsResult"
import { Book } from "../models/booksModels"
import { Request, Response, NextFunction } from "express"
import { BookI } from "../types/booksTypes"

const getAllBooks = async (req: Request, res: Response<QueryResponse>, next: NextFunction):Promise<void> => { 
  try {
    const books = await Book.find()
    res.status(200).json({ 
      success: true,
      message: books.length > 0 ? "Books found" : "No books found",
      data: books
    }) 

  } catch (error) {
    next(error)
  }
}
const addNewBook = async (req: Request, res: Response<QueryResponse>, next: NextFunction):Promise<void> => {
  
  try {
    const { title, isbn }:BookI = req.body
    if (!title || !isbn) {
      res.status(400).json({
        success: false,
        message: "Title and ISBN are required",
      })
      return
   }
    const newBook = await new Book<BookI>({ title, isbn }).save()
    res.status(201).json({
      success: true,
      message: "Book successfully created",
      data: newBook
    });
   
  } catch (error) {
    next(error)
  }
 }
const updateBookk = async (req: Request, res: Response<QueryResponse>, next: NextFunction):Promise<void> => {
  try {
    const { id } = req.params
    const { title, isbn }:BookI = req.body
     if (!id) { 
      res.status(400).json({
        success: false,
        message: "Book ID is required"
      })
       return
    }
    if (!title || !isbn) {
      res.status(400).json({
        success: false,
        message: "Title and ISBN are required"
      })
      return
    }
   
    const updatedBook = await Book.findByIdAndUpdate(id, { title, isbn }, { new: true })

    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found"
      })
      return
    }
    res.status(200).json({
        success: true,
        message: "Book successfully updated",
        data:updatedBook
    })
    
  } catch (error) {
    next(error)
  }
 }
const deleteBook = async (req: Request, res: Response<QueryResponse>, next: NextFunction):Promise<void> => {
  try {
    const { id } = req.params
    if (!id) { 
      res.status(400).json({
        success: false,
        message: "ID is required"
      })
      return
    }
    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found"
      })
      return
    }

    res.status(200).json({
      success: true,
      message: "Book successfully deleted",
      data: deletedBook
    })

  } catch (error) {
    next(error)
  }
 }

export {getAllBooks, addNewBook, updateBookk, deleteBook }