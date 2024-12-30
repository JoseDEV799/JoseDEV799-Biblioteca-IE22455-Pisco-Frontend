import { useEffect, useRef, useState } from "react"
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const CarouselBooks = ({ children, color='#F7E8D0', titleCarousel = 'Sin nombre' }) => {
    const carouselRef = useRef(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isAtEnd, setIsAtEnd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                setScrollLeft(scrollLeft);
                setIsAtEnd(Math.abs(scrollWidth - clientWidth - scrollLeft) < 2);
            }
        };

        const currentRef = carouselRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
            handleScroll();

            return () => {
                currentRef.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const prevPage = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                left: carouselRef.current.scrollLeft - 190,
                behavior: "smooth",
            });
        }
    };

    const nextPage = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                left: carouselRef.current.scrollLeft + 160,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="flex flex-col w-full bg-gray rounded-md relative space-y-4">
            <div className="flex pt-2 mx-2">
                <p className="font-semibold text-lg pl-4 text-black">
                    {titleCarousel}
                </p>
            </div>
            <div className="relative">
                {/* Fog effect containers */}
                <div className={`absolute left-0 top-0 h-full w-20 z-20 pointer-events-none
                    bg-gradient-to-r from-white to-transparent via-white/5
                    ${scrollLeft === 0 ? 'opacity-0' : 'opacity-100'} 
                    transition-opacity duration-300`}
                />
                <div className={`absolute right-0 top-0 h-full w-20 z-20 pointer-events-none
                    bg-gradient-to-l from-white to-transparent via-white/5
                    ${isAtEnd ? 'opacity-0' : 'opacity-100'}
                    transition-opacity duration-300`}
                />
                
                <div 
                    className="flex flex-shrink-0 mx-10 overflow-x-auto h-[350px] my-4 space-x-5 transition-all duration-300 pb-4 z-10 relative scroll-smooth"  
                    ref={carouselRef}
                    style={{
                        scrollbarWidth: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {children}
                </div>
            </div>
            
            <span className="absolute flex w-full top-10 h-40 opacity-80 z-0 rounded-t-md"
                style={{
                    backgroundColor: `${color}`,
                    opacity: '30%'
                }}/>
            
            {/* <button 
                onClick={prevPage}
                className={`absolute top-1/2 -translate-y-1/2 left-0 flex p-1 h-max w-max rounded-full border-2 bg-white transition-all duration-300 z-30
                    ${scrollLeft === 0 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
            >
                <MdNavigateBefore className="size-6 fill-black" />
            </button>
            
            <button 
                onClick={nextPage}
                className={`absolute top-1/2 right-0 -translate-y-1/2 flex p-1 h-max w-max rounded-full border-2 bg-white transition-all duration-300 z-30
                    ${isAtEnd ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
            >
                <MdNavigateNext className="size-6 fill-black" />
            </button> */}
            <button 
                onClick={prevPage}
                className={`absolute -top-3 right-14 flex p-2 h-max w-max rounded-full border-2 bg-white transition-all duration-300 z-30 
                    ${scrollLeft === 0 ? 'cursor-default opacity-50' : 'cursor-pointer opacity-100 hover:scale-105'}`}
            >
                <MdNavigateBefore className="size-6 fill-black" />
            </button>
            
            <button 
                onClick={nextPage}
                className={`absolute -top-3 right-0 flex p-2 h-max w-max rounded-full border-2 bg-white transition-all duration-300 z-30 
                    ${isAtEnd ? 'cursor-default opacity-50' : 'cursor-pointer opacity-100 hover:scale-105'}`}
            >
                <MdNavigateNext className="size-6 fill-black" />
            </button>
        </div>
    )
}

export default CarouselBooks