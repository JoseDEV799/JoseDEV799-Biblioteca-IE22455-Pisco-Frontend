import { FaBookReader } from "react-icons/fa";

const LibroCardSelect = ({ portada, titulo, onClick }) => {

    return (
        <div className="flex justify-center w-full group">
            <div className="flex justify-center items-center flex-col">
                <div className="relative cursor-pointer">
                    <img src={portada} alt="" className="flex h-60 w-40 group-hover:opacity-50 transition-all duration-300" />
                    <button type="button" onClick={onClick} 
                        className="flex w-20 items-center justify-center space-x-2 p-2 border rounded-md bg-yellow-400
                            transition-all duration-300 
                            opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100
                            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        ">
                        <FaBookReader className="size-4 fill-black"/>
                        <p className="text-gray-800">
                            Leer
                        </p>
                    </button>
                </div>
                <p className="">{titulo}</p>
            </div>
        </div>
    )
}

export default LibroCardSelect