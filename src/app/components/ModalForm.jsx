import { IoClose } from "react-icons/io5";
import ButtonAccept from "./UI/ButtonAccept";
import ButtonCancel from "./UI/ButtonCancel";
import ButtonUpdate from "./UI/ButtonUpdate";
import ButtonDelete from "./UI/ButtonDelete";

const ModalForm = ({ className, show, children, onClose, title, options, isAdd, isUpdate, isDelete, onClickCancel, onSubmit, addTitleButton = 'Agregar', isLogin }) => {
    return (
        <div className={`fixed inset-0 flex justify-center items-center backdrop-blur-sm ${show ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
            <div className={`bg-gray-100 relative ${className} w-96 max-h-screen rounded-md shadow-lg border p-4 overflow-y-auto`}>
                <div className="border-b pb-2">
                    <span className="uppercase">
                        {title}
                    </span>
                    <button onClick={() => onClose()} className={`group absolute right-4 top-4 ${isLogin && 'hidden'}`} title="Cerrar">
                        <IoClose className="size-6 group-hover:fill-red-600 transition-all duration-300" />
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="py-2 space-y-4 ">
                        {children}
                    </div>
                    {options &&
                        <>
                            <div className="w-full border-t pt-2">
                                {isDelete &&
                                    <span className="w-full text-xs text-red-600 font-semibold italic">
                                        * Esta acción eliminará permanentemente el dato seleccionado.
                                    </span>
                                }
                                <div className="grid grid-cols-2 gap-4">
                                    {isAdd &&
                                        <ButtonAccept type={'submit'} text={addTitleButton} />
                                    }
                                    {isUpdate &&
                                        <ButtonUpdate />
                                    }
                                    {isDelete &&
                                        <ButtonDelete type="submit"/>
                                    }
                                    <ButtonCancel onClick={onClickCancel} />

                                </div>
                            </div>
                        </>
                    }
                </form>
            </div>
        </div>
    )
}

export default ModalForm