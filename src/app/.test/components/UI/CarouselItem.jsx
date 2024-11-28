const CarouselItem = ({children}) => {

    return (
        <>
            <div className="max-lg:w-full lg:w-1/2 flex-shrink-0 justify-center flex">
                <div className="max-lg:w-[98%] lg:w-[96%] rounded-lg h-56 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-2xl">
                    {children}
                </div>
            </div>
        </>
    )
}

export default CarouselItem