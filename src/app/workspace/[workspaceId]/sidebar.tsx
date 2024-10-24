import { UserButton } from "@/features/auth/conponents/user-button"
import WorkspaceSwitcher from "./workspace-switcher"
import SidebarButton from "./sidebar-button"
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react"
import { usePathname } from "next/navigation"

export const Sidebar = () => {
    const pathname = usePathname();
    
    return (
        <aside className="w-[70px] h-hull bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
            <WorkspaceSwitcher />
            <SidebarButton icon={Home} label="Home" isActive={pathname.includes('/workspace')}/>
            <SidebarButton icon={MessageSquare} label="DMs" isActive/>
            <SidebarButton icon={Bell} label="Activity" isActive/>
            <SidebarButton icon={MoreHorizontal} label="More" isActive/>
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton/>
            </div>
        </aside>
    )
}