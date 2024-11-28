import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const InputFormModal = ({ title, onChange, type, value, disabled = false, optionsSelect = [], optionValue, optionText, placeholderText, error, name }) => {

    const [typeInput, setTypeInput] = useState(true)
    const handleTypeInput = () => {
        setTypeInput(!typeInput)
    }
    return (
        <div className="">
            <label
                className="w-full">
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
                            <select value={value} onChange={onChange}
                                className="w-full rounded-md shadow-sm border border-gray-200 py-2 pl-2">
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