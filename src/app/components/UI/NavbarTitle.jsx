const NavbarTitle = ({ tituloSuperior, tituloInferior }) => {

    return (
        <span className="">
            <p className={`
                text-white leading-3 font-semibold
                desktop:text-xl
                laptop-large:text-lg
                laptop-standar:text-md
                tablet:text-sm
                `}>
                {tituloSuperior}
            </p>
            <p className={`
                text-white
                desktop:text-lg
                laptop-large:text-md
                laptop-standar:text-sm laptop-standar:-mt-2
                tablet:text-xs
                `}>
                {tituloInferior}
            </p>
        </span>
    )
}

export default NavbarTitle