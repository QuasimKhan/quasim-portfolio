import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { updateBlog } from "@/features/blogs/api/blog-api";

import { queryClient } from "@/lib/react-query";

import { queryKeys } from "@/lib/query-keys";

export const useUpdateBlogMutation =
    () => {

        return useMutation({
            mutationFn: updateBlog,

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey:
                        queryKeys.blogs,
                });

                toast.success(
                    "Blog updated successfully"
                );
            },

            onError: () => {

                toast.error(
                    "Failed to update blog"
                );
            },
        });
    };