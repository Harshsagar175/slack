"use client"

import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useJoin } from "@/features/workspaces/api/use-join";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import VerificationInput from "react-verification-input"
import { toast } from "sonner";


const JoinPage = () => {
    const workspaceId = useWorkspaceId();
    const {data , isLoading} = useGetWorkspaceInfo({ id: workspaceId});
    const { mutate , isPending } = useJoin();
    const router = useRouter();
    const isMember = useMemo(() => data?.isMember , [data?.isMember]);
    
    useEffect(() => {
        if(isMember) {
            router.push(`/workspace/${workspaceId}`);
        }
    } , [isMember , router , workspaceId]);
    
    if(isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground"/>
            </div>
        );
    }

    const handleComplete = (value: string) => {
        mutate({ workspaceId , joinCode: value} , {
            onSuccess: (id) => {
                router.replace(`/workspace/${id}`);
                toast.success("workspace joined");
            },
            onError: () => {
                toast.error("falied to join workspace");
            }
        })
    }
    return ( 
        <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
            <Image src="/next.svg" alt="logo" width={60} height={60}  />
            <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <h1 className="text-2xl font-bold">Join {data?.name}</h1>
                    <p className="text-md text-muted-foreground">Enter the workspacecode to join</p>
                </div>
                <VerificationInput classNames={{
                    container: cn("flex gap-x-2" , isPending && "opacity-50 cursor-not-allowed"),
                    character: "upperacase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",    
                    characterInactive: "bg-muted",
                    characterFilled: "bg-white text-black",
                    characterSelected: "bg-white text-black"
                }} 
                length={6} 
                autoFocus
                onComplete={handleComplete}
                />
            </div>
            <div className="flex gap-x-4">
                <Button asChild size='lg' variant="outline">
                    <Link href="/">Bach to home</Link>
                </Button>
            </div>
        </div>
     );
}
 
export default JoinPage;