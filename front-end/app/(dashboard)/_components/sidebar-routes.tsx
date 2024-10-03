'use client'

import { Layout } from 'lucide-react'
import { SidebarItem } from './sidebar-items';

const routesItems = [
    {
        icon: Layout,
        label : "Courses",
        href : '/'
    },
    {
        icon: Layout,
        label : "My Courses",
        href : '/mycourses'
    },
    {
        icon: Layout,
        label : "Browser",
        href : '/search'
    }
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
