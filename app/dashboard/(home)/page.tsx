import Posts from "@/components/Posts";
import { Suspense } from "react";

function DashboardPage() {
  return (
    <main className="flex w-full flex-grow">
      <div className="mx-auto flex max-w-lg flex-1 flex-col space-y-8 pb-20">
        <Suspense
        // fallback={
        //   <PostSkeleton/>
        // }
        >
          <Posts />
        </Suspense>
      </div>
    </main>
  );
}

export default DashboardPage;
