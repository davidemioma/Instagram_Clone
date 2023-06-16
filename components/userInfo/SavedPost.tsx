import React from "react";
import UserPost from "./UserPost";
import { BookmarkProps } from "@/types";
import usePostById from "@/hooks/usePostById";

interface Props {
  bookmark: BookmarkProps;
}

const SavedPost = ({ bookmark }: Props) => {
  const post = usePostById(`${bookmark.id}`);

  if (!post) return null;

  return <UserPost post={post!} />;
};

export default SavedPost;
