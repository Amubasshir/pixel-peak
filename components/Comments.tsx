"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createComment } from "@/lib/actions";
import { CommentWithExtras } from "@/lib/definitions";
import { CreateComment } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function Comments({
  postId,
  comments,
  user,
}: {
  postId: string;
  comments: CommentWithExtras[];
  user?: User | null;
}) {
  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });
  let [isPending, startTransition] = useTransition();
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentWithExtras[]
  >(
    comments,
    // @ts-ignore
    (state: Comment[], newComment: string) => [
      { body: newComment, userId: user?.id, postId, user },
      ...state,
    ],
  );
  const body = form.watch("body");
  const commentsCount = optimisticComments.length;
  return (
    <div className="space-y-0.5 px-3 sm:px-0">
      {commentsCount > 1 && (
        <Link
          scroll={false}
          href={`/dashboard/p/${postId}`}
          className="text-sm font-medium text-neutral-500"
        >
          View all {commentsCount} comments
        </Link>
      )}
      {optimisticComments.slice(0, 3).map((comment, i) => {
        const fullName = comment.user?.username;

        const firstName = fullName ? fullName.split(" ")[0] : "";

        return (
          <div
            key={i}
            className="flex items-center space-x-2 text-sm font-medium"
          >
            <Link
              href={`/dashboard/${comment.user?.username}`}
              className="font-semibold"
            >
              {firstName}
            </Link>
            <p>{comment.body}</p>
          </div>
        );
      })}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            const valuesCopy = { ...values };
            form.reset();
            startTransition(() => {
              addOptimisticComment(valuesCopy.body);
            });

            await createComment(valuesCopy);
          })}
          className="flex items-center space-x-2 border-b border-gray-300 py-1 pb-3 dark:border-neutral-800"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field, fieldState }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border-none bg-transparent text-sm font-medium placeholder-neutral-500 focus:outline-none dark:text-white dark:placeholder-neutral-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {body.trim().length > 0 && (
            <button
              type="submit"
              className="text-sm font-semibold text-sky-500 hover:text-white disabled:cursor-not-allowed disabled:hover:text-sky-500"
            >
              Post
            </button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default Comments;
