import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

type Options = {
    onSuccess?: (data: Id<"workspaces">) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?:boolean;
}

type RequestType = { name : string};
type ResponseType = Id<"workspaces"> | null;

export const useCreateWorkSpace = () => {
    const [data , setData] = useState<ResponseType>(null);
    const [error , setError] = useState<Error | null>(null);
    const [status , setStatus] = useState<"success" | "pending" | "error" | "settled" |null>(null);


    const isPending = useMemo(() => status === "pending" , [status]);
    const isSuccess = useMemo(() => status == "success" , [status]);
    const isError = useMemo(() => status === "error" , [status]);
    const isSettled = useMemo(() => status === "settled" , [status]);
    
    const mutation = useMutation(api.workspaces.create);
    const mutate = useCallback( async(values: RequestType , options?: Options) => {
        try {
            setData(null);
            setError(null);
            setStatus("pending");


            const response = await mutation(values);
            options?.onSuccess?.(response);
            return response;
        } catch(error) {
            options?.onError?.(error as Error);
            if(options?.throwError){
                throw error;
            }
        } finally {
            setStatus("settled")
            options?.onSettled?.();
        }
    } , [mutation]);

    return {
        mutate , data , error , isError , isPending , isSuccess , isSettled
    }
}