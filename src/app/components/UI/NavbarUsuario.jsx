const NavbarUsuario = ({ nombre, rol }) => {

    return (
        <span>
            <p className={`
                text-white leading-3 font-semibold
                desktop:text-xl
                laptop-large:text-xl
                laptop-standar:text-lg
                tablet:text-xs
                `}>
                {nombre}
            </p>
            <p className={`
                text-white text-center
                laptop-standar:text-sm laptop-standar:-mt-2
                tablet:text-xs
                `}>
                {rol}
            </p>
        </span>
    )
}

export default NavbarUsuario