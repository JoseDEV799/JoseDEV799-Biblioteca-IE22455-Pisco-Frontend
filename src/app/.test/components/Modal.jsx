const Modal = ({ children, submit, isOpen, title = 'Titulo', accept = 'Aceptar' }) => {

    return (
        <>
            {/* BACKGROUND BLUR */}
            <div className={`fixed inset-0 z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-blur-sm ${isOpen ? 'block':'hidden'}`}>
                {/* START Content Modal */}
                <div className="flex bg-white border rounded-md p-1 shadow-lg shadow-gray-200">
                    {/* START Form Modal */}
                    <form onSubmit={submit}>
                        {/* START Header Modal */}
                        <div className="flex w-full mb-2 justify-center items-center border-b p-2">
                            <label htmlFor="">{title}</label>
                        </div>
                        {/* END Header Modal */}

                        {/* START Body Modal */}
                        <div className="flex flex-col px-4 py-2 border-b ">
                            {children}
                        </div>
                        {/* END Body Modal */}

                        {/* START Footer Modal */}
                        <div className="flex justify-center items-center py-2">
                            <button type="submit" className="bg-yellow-400 border rounded-md p-1 z-50 text-white shadow-md">
                                {accept}
                            </button>
                        </div>
                        {/* END Footer Modal */}
                    </form>
                    {/* END Form Modal */}
                </div>
                {/* END Content Modal */}
            </div>
        </>
    )
}

export default Modal