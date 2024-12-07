import { Outlet } from "react-router-dom"
import Container from "../../components/Container"
import SidebarAdmin from "../../components/SidebarAdmin"
import OptionSidebar from "../../components/UI/OptionSidebar"
import { FaUsers } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoLibrary } from "react-icons/io5";
import { GiExitDoor } from "react-icons/gi";
import LogoColegio from "../../components/UI/LogoColegio"
import SidebarTitle from "../../components/UI/SidebarTitle"
import SidebarUserData from "../../components/UI/SidebarUserData"
import { useState } from "react"
import ReturnPageMainSidebar from "../../components/UI/ReturnPageMainSidebar"
import ButtonSidebar from "../../components/UI/ButtonSidebar"

const Admin = () => {

    const [sidebarShow, setSidebarShow] = useState(false)

    return (
        <>
            <Container>
                {/* <div className="fixed inset-0 top-0 bottom-0 left-0 right-0 bg-black tablet:hidden max-tablet:block max-tablet:z-50">
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <span className="text-white"> Contenido no disponible </span>
                        <span className="text-white"> Ingrese mediante un dispositivo compatible</span>
                    </div>
                </div> */}
                <div className="bg-gray-50 h-full w-full flex relative">
                    <SidebarAdmin
                        widhtExtend={250}
                        widthCompact={80}
                        isShow={sidebarShow}>
                        {(isHovered) => (
                            <>
                                <ButtonSidebar
                                    isShow={sidebarShow}
                                    onClick={()=>setSidebarShow(false)}
                                    className={`${sidebarShow ? 'absolute z-10 right-2 top-5' : 'hidden'}`} />

                                <SidebarTitle
                                    logo={<LogoColegio />}
                                    isHovered={isHovered}
                                    tituloSuperior={'BIBLIOTECA DIGITAL'}
                                    tituloInferior={'JOSE DE LA TORRE UGARTE'} />

                                <SidebarUserData
                                    isHovered={isHovered} />

                                <OptionSidebar
                                    text={'Usuarios'}
                                    route={'/ie22455/biblioteca/admin'}
                                    isHovered={isHovered}
                                    iconCompact={<FaUsers />}
                                />

                                <OptionSidebar
                                    text={'Categorias'}
                                    route={'/ie22455/biblioteca/admin/categorias'}
                                    isHovered={isHovered}
                                    iconCompact={<BiSolidCategoryAlt />}
                                />

                                <OptionSidebar
                                    text={'Libros'}
                                    route={'/ie22455/biblioteca/admin/libros'}
                                    isHovered={isHovered}
                                    iconCompact={<IoLibrary />}
                                />

                                <ReturnPageMainSidebar
                                    text={'Salir del administrador'}
                                    route={'/principal'}
                                    isHovered={isHovered}
                                    iconCompact={<GiExitDoor />} />
                            </>
                        )}

                    </SidebarAdmin>

                    <div className="flex-1 bg-gray-100 h-screen overflow-y-auto w-full  max-laptop-standar:pl-4 pl-24  py-4 pr-4">
                        <Outlet context={{ sidebarShow, setSidebarShow }} />
                    </div>

                </div>
            </Container>
        </>
    )
}

export default Admin