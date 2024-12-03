import { useState } from "react"
import ButtonSidebar from "./UI/ButtonSidebar"

const SidebarAdmin = ({ children, widhtExtend, widthCompact, isShow }) => {

    const [isHovered, setIsHovered] = useState(false)

    return (
        <>

            <div className={`
                bg-[#2196f3] absolute break-words transition-all duration-200 h-full left-0 top-0 max-laptop-standar:hidden z-10 flex flex-col
            `}
                style={{
                    width: isHovered ? `${widhtExtend}px` : `${widthCompact}px`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children(isHovered)}
            </div>
            <div className="relative">
                <div className={`
                bg-[#2196f3] overflow-y-auto fixed inset-0 ${isShow ? 'translate-x-0' : '-translate-x-full'} break-words transition-all duration-300 h-full left-0 top-0 max-mobile:hidden laptop-standar:hidden z-10`}>
                    {children(isHovered)}
                </div>
            </div>
        </>
    )
}

export default SidebarAdmin