import { FaBookReader } from "react-icons/fa";

const LibroCardSelect = ({ portada, titulo, autor, onClick }) => {

    return (
        <div className="flex flex-shrink-0 flex-col w-44 h-[350px] p-4 border space-y-4  bg-white rounded-md shadow-sm cursor-pointer" onClick={onClick}>
            <img src={portada} alt="" className="flex h-48 w-40 shadow-md shadow-gray-400 hover:scale-105 transition-all duration-300"/>
            <p className="text-center line-clamp-2 h-12 uppercase font-semibold">{titulo}</p>
            <p className="text-center line-clamp-1 italic text-sm">{autor}</p>
        </div>
    )
}

export default LibroCardSelect