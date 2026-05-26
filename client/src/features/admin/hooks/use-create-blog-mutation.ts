import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { createBlog } from "@/features/blogs/api/blog-api";

import { queryClient } from "@/lib/react-query";

import { queryKeys } from "@/lib/query-keys";

export const useCreateBlogMutation =
    () => {

        return useMutation({
            mutationFn: createBlog,

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey:
                        queryKeys.blogs,
                });

                toast.success(
                    "Blog published successfully"
                );
            },

            onError: () => {

                toast.error(
                    "Failed to create blog"
                );
            },
        });
    };