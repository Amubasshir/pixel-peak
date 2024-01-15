"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CreatePost, DeletePost, LikeSchema } from "./schemas";
import { getUserId } from "./utils";

export async function createPost(values: z.infer<typeof CreatePost>) {
  const userId = await getUserId();
  const validateFields = CreatePost.safeParse(values);

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create post",
    };
  }

  const { fileUrl, caption } = validateFields.data;

  try {
    await prisma.post.create({
      data: {
        fileUrl,
        caption,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Database Error: An error occurred while creating the post",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deletePost(formData: FormData) {
  const userId = await getUserId();

  const { id } = DeletePost.parse({
    id: formData.get("id"),
  });
  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
    return { message: " Post Deleted Successfully" };
  } catch (error) {
    return { message: "Database Error: Failed to delete post" };
  }
}

export async function likePost(value: FormDataEntryValue | null) {
  const userId = await getUserId();

  const validatedFields = LikeSchema.safeParse({ postId: value });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Like Post.",
    };
  }

  const { postId } = validatedFields.data;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) {
    throw new Error("Post not found");
  }
  const like = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });
  if (like) {
    try {
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      revalidatePath("/dashboard");
      return { message: "Unliked Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Unlike Post." };
    }
  }
  try {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Liked Post" };
  } catch (error) {
    return { message: "Database Error: Failed to Like Post" };
  }
}
