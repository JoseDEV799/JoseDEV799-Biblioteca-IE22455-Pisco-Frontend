import React, { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const InputFormModal = ({
    title,
    onChange,
    type,
    value,
    disabled = false,
    optionsSelect = [],
    optionValue,
    optionText,
    optionNull,
    placeholderText,
    error,
    name,
    buttonTextFile = 'Subir archivo',
    iconUpFile,
    className,
    htmlFor,
    accessKey
}) => {

    // Intercalar entre mostrar u ocultar contraseña
    const [typeInput, setTypeInput] = useState(true)
    const handleTypeInput = () => {
        setTypeInput(!typeInput)
    }

    return (
        <div className="">
            <label
                className={`grid w-full ${type == 'file' ? 'text-center' : 'text-start'} `}>
                {title}
            </label>

            {(() => {
                switch (type) {
                    case 'password':
                        return (
                            <div className="w-full relative bg-white border-gray-200 shadow-sm rounded-md">
                                <input
                                    className="flex w-full rounded border py-2 pl-2 placeholder:italic pr-8 disabled:opacity-50"
                                    type={typeInput ? 'password' : 'text'}
                                    value={value}
                                    placeholder={placeholderText ? placeholderText : title}
                                    onChange={onChange}
                                    disabled={disabled} />
                                <button
                                    type="button"
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${typeInput ? 'hidden' : ''}`}
                                    onClick={handleTypeInput}
                                    title="Ocultar contraseña">
                                    <RxEyeOpen className="size-4 fill-black" />
                                </button>
                                <button
                                    type="button"
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${typeInput ? '' : 'hidden'}`}
                                    onClick={handleTypeInput}
                                    title="Mostrar contraseña">
                                    <RxEyeClosed className="size-4 fill-black" />
                                </button>
                            </div>
                        )
                    case 'options':
                        return (
                            <select value={value}
                                onChange={onChange}
                                className="w-full rounded-md shadow-sm border border-gray-200 py-2 pl-2">
                                {optionNull &&
                                    <option value={null}>{optionNull}</option>
                                }
                                {optionsSelect.map((option, index) => (
                                    <option key={index} value={option[optionValue]}
                                        className="w-full shadow-sm border border-gray-200 py-2 pl-2">
                                        {option[optionText]}
                                    </option>
                                ))}
                            </select>
                        )
                    case 'delete':
                        return (
                            <p className="w-full italic text-red-600 underline">
                                {value}
                            </p>
                        )
                    case 'onlyRead':
                        return (
                            <p className="w-full italic text-gray-600">
                                {value}
                            </p>
                        )
                    case 'file':
                        return (
                            <div className="flex w-full h-full justify-center items-center">
                                <label
                                    htmlFor={htmlFor}
                                    className={`${className} flex items-center justify-center cursor-pointer w-52 text-center bg-blue-500 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-blue-600 ${className}`}>

                                    {React.cloneElement(iconUpFile, {
                                        className: "size-6 mr-2 fill-gray-200 hover:fill-gray-300 stroke-gray-200 hover:stroke-gray-300"
                                    })}
                                    <p>
                                        {buttonTextFile}
                                    </p>
                                </label>
                                <input
                                    type="file"
                                    id={htmlFor}
                                    key={accessKey}
                                    onChange={onChange}
                                    className="hidden"
                                />
                            </div>
                        )
                    case 'color':
                        return (
                            <div className={`flex w-full h-full justify-center items-center py-2`}>
                                <div className="grid grid-cols-6 w-full gap-4">
                                    {optionsSelect.map((option, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => onChange(option[optionValue])}
                                            className={`flex flex-shrink-0 size-10 rounded-full cursor-pointer ${value === option[optionValue] ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                                                }`}
                                            style={{ backgroundColor: option[optionValue] }}
                                        >
                                            {/* Puedes agregar un checkmark si el color está seleccionado */}
                                            {value === option[optionValue] && (
                                                <span className="text-white text-xs m-auto">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    default:
                        return (
                            <input
                                value={value}
                                className="w-full rounded-md shadow-sm border border-gray-200 py-2 pl-2 placeholder:italic"
                                type={type}
                                placeholder={placeholderText ? placeholderText : title}
                                onChange={onChange} />
                        )
                }
            })()}

            {Array.isArray(error) && error.length > 0 && error.map((errorInput) => {
                return errorInput.path === name && (
                    <span className="w-full text-xs text-red-600 italic" key={errorInput.path}>
                        {errorInput.message}
                    </span>
                );
            })}

        </div>
    )
}

export default InputFormModal