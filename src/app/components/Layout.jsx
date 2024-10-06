import { Outlet } from "react-router-dom"
import { Navbar, Footer } from "./UI"

const Layout = () => {

    return (
        <>
            <Navbar />
            {/* <div className="flex flex-col items-center w-full overflow-y-auto dark:bg-slate-600 bg-slate-50
                4k-screen:h-[calc(100vh-10.25rem)] 
                2xl:h-[calc(100vh-10rem)] 
                xl:h-[calc(100vh-9.25rem)] 
                md:h-[calc(100vh-9rem)] 
                sm:h-[calc(100vh-8.75rem)] 
                max-sm:h-[calc(100vh-9rem)]"> */}
            <div className="flex flex-col items-center w-full overflow-y-hidden dark:bg-blue-950 bg-neutral-50
                4k-screen:h-[calc(100vh-5.25rem)] 
                2xl:h-[calc(100vh-5rem)] 
                xl:h-[calc(100vh-4.25rem)]
                lg:h-[calc(100vh-4rem)] 
                md:h-[calc(100vh-3.75rem)] 
                sm:h-[calc(100vh-3.5rem)] 
                max-sm:h-[calc(100vh-4rem)]">
                <Outlet /> 
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Layout