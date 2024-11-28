import { useForm } from 'react-hook-form'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
const SearchInput = ({ 
    searchFunction, searchInputID, 
    valueInput, changeInput,
    children }) => {

    const { register, handleSubmit } = useForm();
    // const onSubmit = (data) => {
    //     searchFunction(data)
    // }
    const onSubmit = handleSubmit(async (data) => {
        searchFunction(data)
    })

    return (
        <>
            <form onSubmit={onSubmit} className="flex w-full">
                <div className="flex w-2/4 justify-center items-center border border-gray-200 rounded-lg">
                    <input className="flex flex-grow w-full rounded-l-lg py-1 pl-2 placeholder:italic placeholder:pl-1" placeholder="¿Qué libro estas buscando?"
                        {...register(`${searchInputID}`, { required: true })}
                        value={valueInput} onChange={(e) => changeInput(e.target.value)} />
                    <MagnifyingGlassIcon className='fill-gray-700 size-4 rounded-r-lg mx-1' />
                </div>
                {/* <button type='submit' className='border rounded-r-lg p-1 bg-blue-400 border-blue-500'>
                    <MagnifyingGlassIcon className='fill-black size-4' />
                </button> */}
            </form>
            {children}
        </>
    )
}

export default SearchInput