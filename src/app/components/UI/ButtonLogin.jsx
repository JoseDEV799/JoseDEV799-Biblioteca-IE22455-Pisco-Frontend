const ButtonLogin = ({text = 'Iniciar Sesion'}) => {
    return (
        <div className="w-full border-t flex">
            <button type="submit" className="flex mt-2 bg-blue-500 hover:bg-blue-600 p-2 w-full justify-center rounded-md text-white transition-all duration-300">
                {text}
            </button>

        </div>
    )
}
export default ButtonLogin