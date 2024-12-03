import { CiMenuBurger } from "react-icons/ci";

const ButtonSidebar = ({onClick, isShow, className}) => {

    return (
        <button 
            onClick={onClick}
            className={`
                transition-all duration-300
                mr-2 max-mobile:hidden laptop-standar:hidden
                ${className}
            `}>
            <CiMenuBurger className={`size-6 transition-all duration-300 stroke-1 
                ${isShow ? 'stroke-white fill-white rotate-90' : 'stroke-black fill-black'}`}/>
        </button>
    )
}

export default ButtonSidebar
