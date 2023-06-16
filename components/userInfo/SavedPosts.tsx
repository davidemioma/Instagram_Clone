import React from "react";
import { BookmarkProps } from "@/types";
import EmptyPosts from "../EmptyPosts";
import UserPost from "./UserPost";
import usePostById from "@/hooks/usePostById";

interface Props {
  bookmarks: BookmarkProps[];
}

const SavedPosts = ({ bookmarks }: Props) => {
  return (
    <>
      {bookmarks.length > 0 ? (
        <div className="w-full max-w-[calc(1024px-64px)] mx-auto">
          <div className="grid grid-cols-3 gap-1 sm:gap-5 md:gap-8">
            {bookmarks.map((bookmark) => {
              const post = usePostById(`${bookmark?.id}`);

              if (!post) return null;

              return <UserPost post={post!} />;
            })}
          </div>
        </div>
      ) : (
        <EmptyPosts />
      )}
    </>
  );
};

export default SavedPosts;
