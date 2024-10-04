import Image from "next/image";
import { SidebarRoutes } from "./sidebar-routes";

export const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6 flex items-center gap-2 cursor-pointer">
        <Image 
          src="/logo.svg" 
          alt="logo"
          width={30} 
          height={30} 
          className="object-contain" 
        />
        <p className="text-sky-700 font-bold text-sm">Courses Manager</p>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
