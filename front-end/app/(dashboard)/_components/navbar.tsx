import { MobileSideBar } from "./mobile-sidebar";

export const Navbar = () => {
    return (
        <div className="p-4 h-full flex items-center justify-between">
            <MobileSideBar />
        </div>
    );
};

export default Navbar;
