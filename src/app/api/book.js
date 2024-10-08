import axios from "./axios"

export const allBooks = () => axios.get('books')

export const bookCategory = (customParam) => axios.post('books/category', customParam)

export const registerBook = book => axios.post('books/store',book)

export const updateBook = book => axios.post('books/store',book)

export const deleteBook = id => axios.post('books/store',id)

export const searchBook = searchBookInput => axios.post('books/search', searchBookInput)