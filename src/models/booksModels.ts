import { Schema, model } from "mongoose";
import { BookI } from "../types/booksTypes";


const bookSchema = new Schema<BookI>({
  title: {type:String, required:true, trim:true },
  isbn: {type:String, required:true, trim:true}
})

export const Book = model<BookI>("bookSchema", bookSchema)
