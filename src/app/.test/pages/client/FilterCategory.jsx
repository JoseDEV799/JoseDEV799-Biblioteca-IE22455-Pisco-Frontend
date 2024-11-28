import { useEffect, useState } from "react"
import { useBooks } from "../../context/BooksContext"
import { useCategory } from "../../context/CategoryContext"
import Card from "../../components/Card"
import { useNavigate } from "react-router-dom"
import '../../components/Styles/Scrollbar.css'
import bgLight from '../../assets/images/bg-light.jpg'
import bgDark from '../../assets/images/bg-dark.jpg'


const FilterCategory = () => {

    //Contexts
    const { books } = useBooks()
    const { categoryCurrent, categorySelected } = useCategory()
    const navigate = useNavigate()

    useEffect(() => {
        const storedCategory = sessionStorage.getItem('categoryCurrent')
        if (storedCategory && !categoryCurrent) {
            categorySelected(JSON.parse(storedCategory))
        }
        if (!storedCategory && !categoryCurrent) {
            // Solo redirigir si no hay categoría actual ni en la sesión
            navigate('../../principal')
        }
    }, [categoryCurrent, navigate, categorySelected])

    //List Books Filters
    const [bookList, setBookList] = useState([])
    useEffect(() => {
        const fetchSearch = async () => {
            if (categoryCurrent) {
                const results = await books.filter((book) => (
                    book.category.toLowerCase().includes(categoryCurrent)
                ));
                setBookList(results);
            }
        };
        fetchSearch();
    }, [categoryCurrent, books]);


    return (
        <>
            <div className="bg-white dark:bg-slate-900 px-5 my-2 mx-2 py-2 border border-slate-200 dark:border-slate-700 shadow-md shadow-gray-200 dark:shadow-gray-800 rounded-lg">
                <div className="text-center">
                    <span className="w-full text-2xl uppercase italic text-gray-500 dark:text-white font-bold">{categoryCurrent}</span>
                </div>
                {/* <AudioPlayer/> */}
                <span className="flex border-t-2 my-2" />
                <div className="bg-center bg-contain max-h-[calc(100vh-15rem)] grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2 overflow-y-auto px-2 py-2 scrollbar-thin"
                    style={{
                        backgroundImage: `url(${bgDark})`
                    }}>
                    {bookList.map((book, index) => (
                        <div className="flex w-full justify-center" key={index}>
                            <div className="flex flex-col w-max md:justify-start items-center p-4 gap-4 bg-sky-50 bg-opacity-50 dark:bg-sky-950 dark:bg-opacity-50 rounded-md">
                                <img src="https://i.pinimg.com/736x/ab/7a/1d/ab7a1d8d8ac9e4bcf501689ad50dda9d.jpg" alt=""
                                    className="h-56 w-40 transition-all duration-300 shadow-md shadow-gray-700 hover:scale-105 cursor-pointer" />
                                <span className="w-40 dark:text-white uppercase">{book.title}</span>
                            </div>
                        </div>
                    ))}
                    
                    {/* {bookList.map((book, index) => (
                        <Card key={index}
                            title={book.title}
                            author={book.author}
                            
                        />
                    ))} */}

                </div>

            </div>

        </>
    )
}

export default FilterCategory