import { createContext, useContext, useState, useEffect } from 'react'
import { AllCategories } from '../api/category'

export const CategoryContext = createContext()

export const useCategory = () => {
    const context = useContext(CategoryContext)
    if (!context) {
        throw new Error('useCategory must be used within an CategoryProvider')
    }
    return context
}

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([])
    const [categoryCurrent, setCategoryCurrent] = useState(null)

    // Change data Category Current
    const categorySelected = (category) => {
        setCategoryCurrent(category)
    }

    // Detect Changes of Current Category and stored sessionStorage
    useEffect(() => {
        if (categoryCurrent) {
            sessionStorage.setItem('categoryCurrent', JSON.stringify(categoryCurrent))
        }
    }, [categoryCurrent])

    // Restart Data Category Currrent to Null
    const categoryRemoveSelected = () => {
        setCategoryCurrent(null)
    }

    // Get all Categories and saved List Category Context
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await AllCategories()
                setCategories(res.data.Categorias)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories()
    }, [])

    // Try get Category Current saved in Local Storage
    // useEffect(()=>{
    //     const storedCategory = sessionStorage.getItem('categoryCurrent')
    //     if (storedCategory) {
    //         categorySelected(JSON.parse(storedCategory))
    //     }
    // }, [categorySelected])

    return (
        <CategoryContext.Provider value={{ categories, categoryCurrent, categorySelected, categoryRemoveSelected }}>
            {children}
        </CategoryContext.Provider>
    )
} 