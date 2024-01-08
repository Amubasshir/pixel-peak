import { auth } from "@/auth";
import { PostWithExtras } from "@/lib/definitions";
import PostOptions from "./PostOptions";
import Timestamp from "./Timestamp";
import UserAvatar from "./UserAvatar";

interface PostProps {
  post: PostWithExtras;
}

async function Post({ post }: PostProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const username = post.user.username;

  if (!session?.user) return null;

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
    </div>
  );
}

export default Post;
