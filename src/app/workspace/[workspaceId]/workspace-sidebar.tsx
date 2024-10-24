import useCurrentMember from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, Triangle } from "lucide-react";
import WorkspaceHeader from "./workspace-header";

const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();
    const { data: member , isLoading: memberLoadiing} = useCurrentMember({ workspaceId });
    const { data:workspace , isLoading: workspaceLoading} = useGetWorkspace({ id: workspaceId});
    
    if(workspaceLoading || memberLoadiing) {
        return (
            <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
                <Loader className="size-5 animate-spin text-white "/>
            </div>
        )
    }

    if(!workspace || !member) {
        return (
            <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
                <Triangle className="size-5 text-white "/>
                <p className="text-white text-sm">
                    Workspace not found
                </p>
            </div>
        )
    }
    return ( 
        <div className="flex flex-col bg-[#5E2C5F] h-full">
            <WorkspaceHeader workspace={workspace}/>
        </div>
     );
}
 
export default WorkspaceSidebar;