import { FaBookReader } from "react-icons/fa";
import SinPortada from '../../assets/images/sin_portada.jpg'
import { useNavigate } from "react-router-dom";

const LibroCardSelect = ({ portada, titulo, autor }) => {

    const navigate = useNavigate()

    return (
        <div onClick={()=>navigate(`/${titulo}/leer`)}
            className="flex flex-shrink-0 flex-col w-40 h-[300px] mx-1 items-center space-y-4 cursor-pointer shadow-sm shadow-gray-300">
            <div className="w-full bg-white">
                <img src={portada ? portada : SinPortada} alt="" className="flex px-2 pt-2 h-48 w-40 hover:scale-105 transition-all duration-300" />
            </div>
            <p className="text-center line-clamp-2 h-12  font-semibold">{titulo}</p>
            <p className="text-center line-clamp-1 italic text-sm">{autor}</p>
        </div>
    )
}

export default LibroCardSelect