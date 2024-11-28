import '../Styles/SliderBookCustom.css'

const SliderBook = ({min=1, max=2, step=1, value, onChange, className}) => {

    return (
        <>
            <input 
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange} 
                className={`${className}  accent-black dark:accent-white cursor-pointer`}/>
        </>
    )
}

export default SliderBook