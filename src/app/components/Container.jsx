const Container = ({ children }) => {

    return (
        <div className="flex flex-col w-full h-screen overflow-y-auto">
            {children}
        </div>
    )
}

export default Container