import { useRef, useState } from "react";

const CarouselCategories = ({ children }) => {

    const scrollCarouselCategories = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollCarouselCategories.current.offsetLeft)
        setScrollLeft(scrollCarouselCategories.current.scrollLeft)
        scrollCarouselCategories.current.style.cursor = 'grabbing'
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollCarouselCategories.current.offsetLeft;
        const walk = x - startX; // Distancia movida
        scrollCarouselCategories.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        scrollCarouselCategories.current.style.cursor = "grab";
    };

    return (
        <div ref={scrollCarouselCategories}
            className={`flex w-full flex-shrink-0 h-14 shadow-sm overflow-x-auto items-center px-5 space-x-3
                bg-white`}
            style={{ scrollbarWidth: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}>
            {children}
        </div>
    )
}

export default CarouselCategories