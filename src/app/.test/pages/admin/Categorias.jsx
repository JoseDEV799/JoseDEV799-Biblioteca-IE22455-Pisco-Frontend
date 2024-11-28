const Categorias = () => {

    return (
        <>
            <div className="relative w-64 h-32 bg-blue-500 text-white flex items-center justify-center">
                {/* Contenido por defecto */}
                <div className="hover:hidden">Contenido Inicial</div>
                {/* Contenido al hacer hover */}
                <div className="hidden hover:flex hover:absolute hover:inset-0 hover:items-center hover:justify-center">
                    Contenido en Hover
                </div>
            </div>
        </>
    )
}

export default Categorias