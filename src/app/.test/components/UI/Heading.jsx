const Heading = ({level=1, text, className, children}) => {

    const HeadingTag = `h${level}`

    const levelClassesText = {
        1: 'min-[1900px]:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-base max-sm:text-sm',
        2: 'min-[1900px]:text-3xl 2xl:text-2xl xl:text-xl lg:text-lg md:text-base sm:text-sm max-sm:text-xs',
        3: 'min-[1900px]:text-2xl 2xl:text-xl xl:text-lg lg:text-base md:text-sm sm:text-xs max-sm:text-xs',
        4: 'min-[1900px]:text-xl 2xl:text-lg xl:text-base lg:text-sm md:text-xs sm:text-xs max-sm:text-xs',
        5: 'min-[1900px]:text-lg 2xl:text-base xl:text-sm lg:text-xs md:text-xs sm:text-sm max-sm:text-xs',
        6: 'min-[1900px]:text-base 2xl:text-sm xl:text-xs lg:text-xs md:text-xs sm:text-xs max-sm:text-xs',
    }

    return (    
        <>
            <HeadingTag className={`${levelClassesText[level]} font-nunito ${className} `}>
                {children}
                {text}
            </HeadingTag>
        </>
    )
}

export default Heading