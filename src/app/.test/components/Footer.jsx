import iconSchool from '../assets/icons/iconSchool.png'
import iconUGEL from '../assets/icons/iconUGEL.png'
import iconMINEDU from '../assets/icons/iconMINEDU.png'

const Footer = () => {

    return (
        <>
            {/* START Icons and Title */}
            <footer className="flex h-auto p-5 items-center bg-gradient-to-r from-[#137FD9] to-[#0076d6] dark:from-[#013a74] dark:to-[#2196F3]">
                <img src={iconMINEDU} alt="" className='h-10' />
                <img src={iconUGEL} alt="" className='h-10' />
            </footer>
            {/* END Icons and Title */}
        </>
    )
}

export default Footer