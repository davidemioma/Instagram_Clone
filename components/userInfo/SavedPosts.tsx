import React from "react";
import SavedPost from "./SavedPost";
import EmptyPosts from "../EmptyPosts";
import { BookmarkProps } from "@/types";

interface Props {
  bookmarks: BookmarkProps[];
}

const SavedPosts = ({ bookmarks }: Props) => {
  return (
    <>
      {bookmarks.length > 0 ? (
        <div className="w-full max-w-[calc(1024px-64px)] mx-auto">
          <div className="grid grid-cols-3 gap-1 sm:gap-5 md:gap-8">
            {bookmarks.map((bookmark) => (
              <SavedPost key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyPosts />
      )}
    </>
  );
};

export default SavedPosts;
