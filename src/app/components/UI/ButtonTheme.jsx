import { useState } from "react"
import { FiSun } from "react-icons/fi";
import { FiMoon } from 'react-icons/fi';

const ButtonTheme = () => {

    const [themeCurrent, setThemeCurrent] = useState(false)
    const handleChangeTheme = () => {
        setThemeCurrent(!themeCurrent)
    }

    return (
        <button onClick={handleChangeTheme} className="relative size-6">
            <FiMoon className={`absolute inset-0 transition-all duration-300 size-6 stroke-blue-100 fill-blue-400 ${themeCurrent ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
            <FiSun className={`absolute inset-0 transition-all duration-300 size-6 stroke-yellow-300 ${themeCurrent ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
        </button>
    )
}

export default ButtonTheme