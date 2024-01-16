import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "./ui/card";

export function PostSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <Skeleton className="h-[450px]" />
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  );
}

export function EditPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit info</DialogTitle>
        </DialogHeader>

        <AspectRatio ratio={1 / 1} className="relative h-full">
          <Skeleton className="h-full w-full" />
        </AspectRatio>

        <Skeleton className="h-10 w-full" />
      </DialogContent>
    </Dialog>
  );
}

export function ViewPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent className="flex h-full max-h-[500px] flex-col items-start gap-0 p-0 md:max-w-3xl md:flex-row lg:max-h-[700px] lg:max-w-5xl xl:max-h-[800px] xl:max-w-6xl">
        <Skeleton className="relative h-96 w-full max-w-3xl overflow-hidden rounded-r-none md:h-[500px] lg:h-[700px] xl:h-[800px]" />

        <div className="flex h-full flex-1 flex-col py-4 pl-3.5 pr-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          <Skeleton className="my-4 flex-1" />

          <div className="flex w-full items-center space-x-4">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-full flex-1" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UserAvatarSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function SinglePostSkeleton() {
  return (
    <Card className="mx-auto hidden max-w-3xl md:flex lg:max-w-4xl">
      <div className="relative h-[450px] w-full max-w-sm overflow-hidden  lg:max-w-lg">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex max-w-sm flex-1 flex-col">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3 px-5">
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
        </div>
      </div>
    </Card>
  );
}
