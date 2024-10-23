import { UserButton } from "@/features/auth/conponents/user-button"
import WorkspaceSwitcher from "./workspace-switcher"

export const Sidebar = () => {
    return (
        <aside className="w-[70px] h-hull bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
            <WorkspaceSwitcher />
            <div className="flex flex-col itmes-center justify-center gap-y-1 mt-auto">
                <UserButton/>
            </div>
        </aside>
    )
}