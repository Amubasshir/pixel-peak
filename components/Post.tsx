import { auth } from "@/auth";
import { PostWithExtras } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import Comments from "./Comments";
import PostActions from "./PostActions";
import PostOptions from "./PostOptions";
import Timestamp from "./Timestamp";
import UserAvatar from "./UserAvatar";
import { Card } from "./ui/card";

interface PostProps {
  post: PostWithExtras;
}

async function Post({ post }: PostProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const username = post.user.username;

  if (!session?.user) return null;

  function getFirstName(fullName: string) {
    const names = fullName.split(" ");
    return names[0];
  }

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex items-center space-x-3">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold capitalize">{username}</span>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
                .
              </span>
              <Timestamp createdAt={post.createdAt} />
            </p>
            <p className="text-sm font-medium text-black dark:text-white">
              Sydney, Australia
            </p>
          </div>
        </div>
        <PostOptions post={post} userId={userId} />
      </div>
      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt="Post Image"
          fill
          className="object-cover sm:rounded-md"
        />
      </Card>
      <PostActions post={post} userId={userId} className="px-3 sm:px-0" />
      {post.caption && (
        <div className="flex items-center space-x-2 px-3 text-sm font-medium leading-none sm:px-0">
          {username ? (
            <Link href={`/dashboard/${username}`} className="font-bold">
              {getFirstName(username)}
            </Link>
          ) : (
            <span className="font-bold">Unknown User</span>
          )}
          <p className="text-gray-400">{post.caption}</p>
        </div>
      )}

      <Comments postId={post.id} comments={post.comments} user={session.user} />
    </div>
  );
}

export default Post;
