import React from "react";
import Post from "./post/Post";
import usePosts from "@/hooks/usePosts";

const Feed = () => {
  const posts = usePosts();

  return (
    <div className="w-full lg:w-[55%] flex flex-col gap-3 py-7">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
