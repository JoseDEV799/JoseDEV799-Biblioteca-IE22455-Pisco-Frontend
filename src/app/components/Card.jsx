import { EyeIcon } from "@heroicons/react/24/solid"
import { Button, Heading } from "./UI/index"
const Card = ({ title = 'Titulo', author = 'Autor', category }) => {

    return (
        <>
            <div className="flex py-3 justify-center items-center rounded-lg gap-3 h-56
                bg-gradient-to-r from-sky-400 to-violet-500">
                <div className="flex flex-shrink-0 h-64 w-1/2 sm:w-1/3 justify-end sm:justify-center items-center">
                    <img src="https://i.pinimg.com/736x/ab/7a/1d/ab7a1d8d8ac9e4bcf501689ad50dda9d.jpg" alt=""
                        className="transition-all duration-300 max-sm:w-24 sm:w-32 max-sm:h-40 sm:h-48 hover:scale-105 shadow-md shadow-gray-700" />
                </div>
                <div className="flex flex-col w-1/2 sm:w-2/3 h-full justify-center whitespace-normal space-y-1">
                    <Heading
                        level={3}
                        className={'uppercase font-extralight text-white'}
                        text={title} />
                    <Heading
                        level={3}
                        className="italic text-white"
                        text={author} />
                    <Button
                        justify="start"
                        className="flex w-6 hover:w-14 duration-300 border p-1 rounded-full bg-white text-xs group"
                        onClick={() => navigate('../read-book', { state: { pdf } })}>
                        <EyeIcon className="size-4 fill-gray-600 transition-transform duration-300 group-hover:scale-110 w-full group-hover:w-auto" />
                        <span className="group-hover:mx-1 text-gray-500 transition-opacity opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto ">Leer</span>
                    </Button>
                </div>
            </div>
        </>
    )
}
export default Card