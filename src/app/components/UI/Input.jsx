import { useForm } from 'react-hook-form'

const Input = ({ type, value, placeholder, onChange, className, icon, iconStatus = false, iconDirection = 'left', register, IDForm }) => {

    return (
        <>
            <div className="flex w-full border border-slate-300 dark:border-slate-700 rounded-md shadow-md shadow-gray-200 dark:shadow-gray-700">
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${className} placeholder:italic items-center pl-2 py-1.5 flex bg-white dark:bg-slate-900 text-gray-700 dark:text-white
                    ${( !iconStatus ) && 'w-full rounded-md'}
                    ${( iconDirection == 'left') && 'border-l border-white dark:border-slate-900 rounded-r-md w-full order-2'}
                    ${( iconDirection == 'right') && 'border-r rounded-l-md flex-grow order-1'}`} 
                    {...(register && register(IDForm, { required: true }))}/>
                
                {iconStatus && 
                    <div className={`flex justify-center items-center px-2 bg-gradient-to-r from-amber-300 to-orange-300 dark:from-amber-400 dark:to-orange-400
                        ${( iconDirection == 'left') && 'order-1 rounded-l-md'}
                        ${( iconDirection == 'right') && 'order-2 rounded-r-md'}
                    `}>
                        {icon}
                    </div>
                }
            </div>
        </>
    )
}

export default Input