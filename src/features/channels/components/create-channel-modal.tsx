import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCreateChannelModal } from "../store/use-create-channel-modal"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useCurrentMember from "@/features/members/api/use-current-member";

export const CreateChannelModal = () => {
    const router = useRouter();

    const [open , setOpen] = useCreateChannelModal();
    const [name , setName] = useState("");
    const {mutate , isPending} = useCreateChannel();
    const workspaceId = useWorkspaceId(); 
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g , "-").toLowerCase();
        setName(value);
    }
    const handleClose = () => {
        setName("");
        setOpen(false);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(
            { name , workspaceId },
            {
                onSuccess: (id) => {
                    toast.success("channel created");
                    router.push(`/workspace/${workspaceId}/channel/${id}`)
                    handleClose();
                },
                onError: () => {
                    toast.error("failed to create a channel");
                }
            }
        )
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input value={name} disabled={isPending} onChange={handleChange} required autoFocus minLength={3} maxLength={80} placeholder="e.g. 'Discussions' , 'Projects' , etc" />
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    );
}; 