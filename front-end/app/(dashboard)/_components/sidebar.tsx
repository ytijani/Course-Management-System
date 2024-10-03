import { SidebarRoutes } from "./sidebar-routes"


export const SideBar = () => {

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <h1>Logo</h1>
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    )
}

