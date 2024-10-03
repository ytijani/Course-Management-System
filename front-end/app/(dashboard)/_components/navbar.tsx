import { MobileSideBar } from "./mobile-sidebar"


export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm ">
            <MobileSideBar/>
            
        </div>
    )
}

export default Navbar