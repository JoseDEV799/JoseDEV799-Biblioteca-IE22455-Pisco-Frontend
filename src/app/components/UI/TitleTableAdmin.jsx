const TitleTableAdmin = ({title}) => {
    
    return(
        <span className="uppercase w-full font-semibold
            desktop:text-lg
            laptop-standar:text-md
            tablet:text-sm
            max-tablet:text-xs">
            {title}
        </span>
    )
}

export default TitleTableAdmin