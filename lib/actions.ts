"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CreatePost } from "./schemas";
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
