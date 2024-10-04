'use client'

import { Layout, List } from 'lucide-react'
import { SidebarItem } from './sidebar-items';

const routesItems = [
    {
        icon: List,
        label : "Courses",
        href : '/'
    },
    {
        icon: Layout,
        label : "Add Course",
        href : '/addcourse'
    },
]

export const SidebarRoutes = () => {
    const routes = routesItems;
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}
