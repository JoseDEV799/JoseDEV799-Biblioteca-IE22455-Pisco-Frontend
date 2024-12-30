const ButtonCategoryFilter = ({ title, onClick, keyApi = 'Default', isSelect, color = '#000000' }) => {
    // Generar color RGBA con la opacidad especificada
    const colorWithOpacity = (opacity) => {
        const r = parseInt(color.slice(1, 3), 16); // Extraer el valor rojo
        const g = parseInt(color.slice(3, 5), 16); // Extraer el valor verde
        const b = parseInt(color.slice(5, 7), 16); // Extraer el valor azul
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    // Definir el color de fondo actual
    const backgroundColor = isSelect
        ? colorWithOpacity(0.5) // 70% opacidad si está seleccionado
        : colorWithOpacity(0.1); // 50% opacidad si no está seleccionado

    return (
        <button
            key={keyApi}
            type="button"
            onClick={onClick}
            className={`flex flex-shrink-0 border py-2 px-4 rounded-full transition-all duration-300 text-sm shadow-sm
                ${isSelect ? 'text-black' : 'text-gray-700'}
            `}
            style={{
                backgroundColor: backgroundColor,
            }}
            onMouseEnter={(e) => {
                if (!isSelect) e.currentTarget.style.backgroundColor = colorWithOpacity(0.5); // 60% opacidad en hover
            }}
            onMouseLeave={(e) => {
                if (!isSelect) e.currentTarget.style.backgroundColor = backgroundColor; // Restaurar opacidad
            }}
        >
            {title}
        </button>
    );
};

export default ButtonCategoryFilter;
