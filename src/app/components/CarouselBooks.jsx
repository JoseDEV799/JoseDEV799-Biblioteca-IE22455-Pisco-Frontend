import { useEffect, useRef, useState } from "react"
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const CarouselBooks = ({ children, titleCarousel = 'Sin nombre' }) => {
    const carouselRef = useRef(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isAtEnd, setIsAtEnd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                setScrollLeft(scrollLeft);
                // Corrección: usar una comparación más precisa para detectar el final
                setIsAtEnd(Math.abs(scrollWidth - clientWidth - scrollLeft) < 2);
            }
        };

        const currentRef = carouselRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
            // Llamar handleScroll inicialmente para establecer el estado correcto
            handleScroll();

            return () => {
                currentRef.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const prevPage = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                left: carouselRef.current.scrollLeft - 200,
                behavior: "smooth",
            });
        }
    };

    const nextPage = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                left: carouselRef.current.scrollLeft + 200,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="flex flex-col w-full bg-gray rounded-md relative">
            <div className="flex pt-2 mx-2 items-center border-b border-[#137FD9]">
                <p className="font-semibold text-lg pl-4 text-[#137FD9]">
                    {titleCarousel}
                </p>
            </div>
            <div 
                className="flex flex-shrink-0 mx-10 overflow-x-auto h-full my-4 space-x-5 transition-all duration-300" 
                ref={carouselRef}
                style={{
                    scrollbarWidth: 'none'
                }}
            >
                {children}
            </div>
            <button 
                onClick={prevPage}
                className={`absolute top-1/2 -translate-y-1/2 left-0 flex p-1 h-max w-max rounded-full border-2 bg-white transition-all duration-300
                ${scrollLeft == 0 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
            >
                <MdNavigateBefore className="size-6 fill-black" />
            </button>
            <button 
                onClick={nextPage}
                className={`absolute top-1/2 right-0 -translate-y-1/2 flex p-1 h-max w-max rounded-full border-2 bg-white transition-all duration-300
                ${isAtEnd ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
            >
                <MdNavigateNext className="size-6 fill-black" />
            </button>
        </div>
    )
}

export default CarouselBooks