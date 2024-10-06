import { createContext, useContext, useEffect, useState } from 'react'
import { allBooks } from '../api/book'

export const BooksContext = createContext()

export const useBooks = () => {
    const context = useContext(BooksContext)
    if (!context) {
        throw new Error('useBooks must be used within an BooksProvider')
    }
    return context
}

export const BooksProvider = ({children}) =>{

    const [books, setBooks] = useState([])
    const [bookResult, setBookResult] = useState([])

    useEffect(()=>{
        const fetchBoks = async () => {
            const res = await allBooks()
            setBooks(res.data.books)
        }
        fetchBoks()
    },[])

    const searchBookData = (data) => {
        setBookResult(data)
    }

    const resetSearchBookData = () => {
        setBookResult([])
    }

    return (
        <BooksContext.Provider value={{books, bookResult, searchBookData, resetSearchBookData}}>
            {children}
        </BooksContext.Provider>
    )
}