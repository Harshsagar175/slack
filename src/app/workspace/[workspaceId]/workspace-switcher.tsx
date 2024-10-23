// import { Button } from '@/components/ui/button';
// import { DropdownMenu , DropdownMenuContent , DropdownMenuItem , DropdownMenuSeparator , DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// import { useCreateWorkSpace } from '@/features/workspaces/api/use-create-workspaces';
// import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
// import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
// import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
// import { useWorkspaceId } from '@/hooks/use-workspace-id';
// import { Loader } from 'lucide-react';


// export const WorkspaceSwitcher = () => {
//     const workspaceId = useWorkspaceId();
//     const [_open , setOpen] = useCreateWorkspaceModal();

//     const { data: workspaces , isLoading: workspacesLoading } = useGetWorkspaces();
//     const { data:workspace , isLoading: workspaceLoading } = useGetWorkspace({id: workspaceId});
    
//     const filterWorkspaces = workspaces?.filter(
//         (workspace) => workspace?._id !== workspaceId
//     )
//     return ( 
//         <DropdownMenu>
//             <DropdownMenuTrigger>
//                 <Button  className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl'>
//                     {workspaceLoading ? <Loader className='size-5 animate-spin shrink-0' /> : workspace?.name.charAt(0).toUpperCase()}
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent side='bottom' align='start' className='w-64'>

//             </DropdownMenuContent>
//         </DropdownMenu>
//      );
// }
 
// export default WorkspaceSwitcher;

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCreateWorkSpace } from '@/features/workspaces/api/use-create-workspaces';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Loader } from 'lucide-react';
import { useState, useEffect } from 'react';

export const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateWorkspaceModal();
  
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
  
  const filterWorkspaces = workspaces?.filter((workspace) => workspace?._id !== workspaceId);
  
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders dropdown when mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <DropdownMenu>
      {isMounted && (
        <DropdownMenuTrigger>
          <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
            {workspaceLoading ? (
              <Loader className="size-5 animate-spin shrink-0" />
            ) : (
              workspace?.name?.charAt(0).toUpperCase()
            )}
          </Button>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        {/* Dropdown content */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
