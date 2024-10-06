import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"

const ButtonTheme = () => {

    const [darkMode, setDarkMode] = useState(true)
    const toggleDarkMode = () => {
        if (darkMode) {
            (document.documentElement.classList.add("dark"), document.documentElement.classList.remove("light"))
            localStorage.setItem('currentTheme', JSON.stringify('dark'))
            setDarkMode(false)
        } else {
            (document.documentElement.classList.remove("dark"), document.documentElement.classList.add("light"))
            localStorage.setItem('currentTheme', JSON.stringify('light'))
            setDarkMode(true)
        }
    }

    useEffect(()=>{
        const themeCustom = localStorage.getItem('currentTheme')
        if (JSON.parse(themeCustom) == 'dark') {
            (document.documentElement.classList.add("dark"), document.documentElement.classList.remove("light"))
            setDarkMode(false)
        }
    },[])

    return (
        <>
            <button onClick={toggleDarkMode} className="flex w-10 items-center rounded-full cursor-pointer transition-all duration-300 border border-gray-300 shadow-sm bg-sky-300 dark:bg-sky-800">
                <div className='flex rounded-full border transition-transform duration-300 border-yellow-300 dark:border-blue-200 bg-white translate-x-0 dark:translate-x-4'>
                    {darkMode ?
                        (<SunIcon className="fill-yellow-500 size-5" />)
                        :
                        (<MoonIcon className="fill-blue-200 size-5" />)
                    }
                </div>

            </button>
        </>
    )
}

export default ButtonTheme