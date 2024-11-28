import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SparklesIcon } from "@heroicons/react/24/solid"
import { EyeIcon } from "@heroicons/react/24/outline"
import { Carousel, CarouselItem, Heading, Button, Card } from "../../components/UI"
import { useCategory } from "../../context/CategoryContext"
import { useBooks } from "../../context/BooksContext"
import pdf from '../../assets/pdf/hola.pdf';

const Index = () => {

    const { categorySelected, categoryRemoveSelected } = useCategory()
    const { books } = useBooks()
    const navigate = useNavigate()

    useEffect(()=>{
        categoryRemoveSelected()
    },[])

    return (
        <>
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 mt-2 rounded-lg px-2 py-2 mx-2">
                <div className="flex flex-col w-full justify-start">
                    <div className="flex flex-row items-center space-x-1">
                        <SparklesIcon className="size-6 fill-yellow-500 stroke-yellow-400 stroke-1" />
                        <span className="text-xl font-nunito font-bold text-gray-900 dark:text-white">Sugerido</span>
                    </div>
                    <span className="flex border mb-2"/>
                    <div className="flex w-full">
                        <Carousel lengthList={books.length}>
                            {books.map((book, index) => (
                                <CarouselItem key={index}>
                                    <div className="flex flex-row justify-center items-center max-md:px-3">
                                        <div className="flex max-lg:w-1/2 lg:w-1/3 lg:ml-6 xl:ml-0 max-md:justify-center md:justify-end">
                                            <img src="https://descubierta.es/wp-content/uploads/2022/06/Cover.jpg" alt="" className="max-sm:w-24 sm:w-32 max-sm:h-40 sm:h-48 shadow-md shadow-gray-700 transition-transform duration-300 hover:scale-105" />
                                        </div>
                                        <div className="flex flex-col max-lg:w-1/2 lg:w-2/3 md:ml-4 justify-start whitespace-normal max-sm:space-y-1 sm:space-y-2">
                                            <Heading
                                                level={3}
                                                className={'uppercase font-extralight '}
                                                text={book.title} />
                                            <Heading
                                                level={3}
                                                className="italic"
                                                text={book.author} />
                                            <Button
                                                onClick={() => {
                                                    categorySelected(book.category)
                                                    navigate('./filter-category')
                                                }}
                                                className="border text-sm w-max pl-1 pr-2 rounded-lg bg-white text-gray-500 italic hover:scale-105 duration-200"
                                                text={book.category} />
                                            <Button
                                                justify="start"
                                                className="flex w-6 hover:w-14 duration-300 border p-1 rounded-full bg-white text-xs group"
                                                onClick={()=> navigate('../read-book', {state: {pdf}})}>
                                                <EyeIcon className="size-4 fill-gray-600 transition-transform duration-300 group-hover:scale-110 w-full group-hover:w-auto" />
                                                <span className="group-hover:mx-1 text-gray-500 transition-opacity opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto ">Leer</span>
                                            </Button>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index