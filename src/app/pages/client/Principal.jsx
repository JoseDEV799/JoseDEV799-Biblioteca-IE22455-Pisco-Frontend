import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Button, Input, DropDown, UnorderedList, ListItem, FilterPanel } from "../../components/UI"
import { useCategory } from "../../context/CategoryContext"
import { useBooks } from "../../context/BooksContext"
import '../../components/Styles/Scrollbar.css'


export default function Principal() {
    //Input Search Book
    const [bookInput, setBookInput] = useState('')

    //Contexts
    const { categories, categoryCurrent, categorySelected, categoryRemoveSelected } = useCategory()
    const { books, bookResult, searchBookData, resetSearchBookData } = useBooks()
    const navigate = useNavigate()

    const [isShowPanel, setIsShowPanel] = useState(false)
    const togglePanel = () => {
        setIsShowPanel(!isShowPanel)
        sessionStorage.setItem('isShowPanelCategories', JSON.stringify(!isShowPanel))
    }
    
    if (!categories || !Array.isArray(categories)) {
        return <div>Cargando...</div> // O cualquier otro mensaje/estado que desees
    }

    useEffect(()=>{
        const isShowPanelCategories = sessionStorage.getItem('isShowPanelCategories')
        setIsShowPanel(JSON.parse(isShowPanelCategories))
    },[])

    useEffect(() => {
        const fetchSearch = async () => {
            if (bookInput.trim()) {
                const results = await books.filter((book) => (
                    book.title.toLowerCase().includes(bookInput.toLowerCase())
                ))
                searchBookData(results)
            } else {
                resetSearchBookData()
            }
        }
        fetchSearch()
    }, [bookInput])

    const deepColors = [
        "dark:bg-red-700",
        "dark:bg-orange-700",
        "dark:bg-amber-700",
        "dark:bg-green-700",
        "dark:bg-teal-700",
        "dark:bg-blue-700",
        "dark:bg-indigo-700",
        "dark:bg-violet-700",
        "dark:bg-purple-700",
        "dark:bg-emerald-700",
        "dark:bg-cyan-700",
        "dark:bg-sky-700",
        "dark:bg-fuchsia-700",
        "dark:bg-pink-700",
        "dark:bg-rose-700"
    ];

    // Lista de colores de tono 300
    const lightColors = [
        "bg-red-300",
        "bg-orange-300",
        "bg-yellow-300",
        "bg-green-300",
        "bg-teal-300",
        "bg-blue-300",
        "bg-indigo-300",
        "bg-violet-300",
        "bg-purple-300",
        "bg-pink-300",
        "bg-rose-300",
        "bg-emerald-300",
        "bg-cyan-300",
        "bg-sky-300",
        "bg-fuchsia-300",
        "bg-lime-300"
    ];

    return (
        <>
            <div className="flex max-md:flex-col md:flex-row w-full items-center max-sm:px-2 mt-2">
                <div className="flex max-md:w-full md:w-1/5 justify-center items-center max-sm:mt-2 max-md:order-2 order-1">
                    <Button
                        text={'Categorias'}
                        onClick={togglePanel}
                        className={'border border-slate-300 dark:border-slate-700 shadow-md max-md:mx-5 shadow-gray-200 dark:shadow-gray-700 text-slate-700 dark:text-white bg-gradient-to-r from-amber-300 to-orange-300 dark:from-amber-400 dark:to-orange-400 hover:scale-105 hover:shadow-sm p-2 rounded-md max-lg:text-xs lg:text-sm xl:text-lg 2xl:text-base 4k-screen:text-xl max-md:w-full sm:relative'}>
                        <FunnelIcon className="size-4 fill-slate-600 dark:fill-white stroke-2" />
                    </Button>
                </div>
                <div className="flex max-md:w-full md:w-4/5 max-md:order-1 order-2">
                    <div className="relative inline-block md:pl-10 mx-5
                            2xl:w-1/3 xl:w-1/2 lg:w-2/3 max-lg:w-full">
                        <Input
                            placeholder={'¿Qué libro estas buscando?'}
                            value={bookInput}
                            onChange={setBookInput}
                            className={'max-sm:text-sm'}
                            iconStatus={true}
                            iconDirection={'left'}
                            icon={<MagnifyingGlassIcon className="size-4 stroke-2 fill-slate-700 dark:fill-white" />}
                        />
                        {bookInput.trim() &&
                            (
                                <DropDown
                                    className={'bg-white w-full border border-gray-300 rounded-md mt-1 z-10'}>
                                    <UnorderedList className={'space-y-1'}>
                                        {bookResult.length == 0 ?
                                            (
                                                <ListItem className={'flex flex-col hover:bg-inherit'}>
                                                    <span className="select-none">Sin resultados</span>
                                                </ListItem>
                                            )
                                            :
                                            (
                                                <>
                                                    {bookResult.slice(0, 4).map((book) => (
                                                        <ListItem key={book._id} className={'flex flex-col cursor-pointer'}>
                                                            <span>{book.title}</span>
                                                            <span>{book.author}</span>
                                                        </ListItem>
                                                    ))}
                                                    {bookResult.length > 4 && (
                                                        <ListItem className={'flex flex-col cursor-pointer bg-sky-600'}>
                                                            <span>Ver más resultados</span>
                                                        </ListItem>
                                                    )}
                                                </>
                                            )
                                        }
                                    </UnorderedList>
                                </DropDown>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="flex w-full mt-5 transition-all duration-300">
                <div className={`flex max-md:hidden ${isShowPanel ? 'w-1/5' : 'w-0'}`}>
                    <FilterPanel
                        isOpenFilter={isShowPanel}
                        className={'sticky w-full top-16 sm:px-3 md:px-5 max-h-[calc(100vh-10rem)]'}
                        classOpen={'translate-x-0'}
                        classClose={'-translate-x-96'}>
                        <UnorderedList className={'bg-white dark:bg-slate-900 space-y-2 border border-slate-200 dark:border-slate-700 my-2 py-2 px-10 md:px-1 lg:px-5 xl:px-10 flex flex-col w-full max-h-full overflow-auto scrollbar-hide rounded-lg shadow-md shadow-gray-200 dark:shadow-gray-800'}>
                            {/* <span className="text-center text-white uppercase text-xl">Categorias</span> */}

                            {categories.map((category, index) => (
                                <ListItem key={index}
                                    className={'relative'}>
                                    <Button
                                        onClick={(event) => {
                                            if (categoryCurrent == category.name) {
                                                categoryRemoveSelected()
                                                navigate('../principal')
                                            }
                                            else {
                                                categorySelected(category.name)
                                                navigate('./filter-category')
                                            }
                                            

                                        }
                                        }
                                        text={category.name}
                                        className={`flex-grow font-bold justify-center items-center duration-300 rounded-md md:py-1 lg:py-2
                                            text-gray-700 dark:text-white 
                                            sm:text-xs md:text-sm lg:text-text-base hover:opacity-95 hover:scale-105
                                            ${categoryCurrent === category.name ?
                                                // 'from-cyan-400 to-blue-500 scale-110 text-white shadow-md shadow-sky-500 z-10'
                                                `scale-110 text-white z-10 ${lightColors[index%lightColors.length]} ${deepColors[index%deepColors.length]} shadow-sm shadow-gray-400 dark:shadow-gray-800`
                                                :
                                                // 'scale-100 from-cyan-200 to-blue-300 text-slate-600'
                                                `scale-100 text-slate-600 ${lightColors[index%lightColors.length]} ${deepColors[index%deepColors.length]}`
                                            }
                                        `}
                                    >
                                    </Button>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </FilterPanel>
                </div>

                <div className={`flex flex-col transition-all duration-300
                    ${isShowPanel ? 'md:w-4/5 max-md:w-full' : 'w-full'}`}>
                    <Outlet />
                </div>
            </div>
        </>

    )
}