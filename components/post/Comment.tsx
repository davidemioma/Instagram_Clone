import React from "react";
import { CommentProps } from "@/types";
import useAccountById from "@/hooks/useAccountById";

interface Props {
  comment: CommentProps;
}

const Comment = ({ comment }: Props) => {
  const account = useAccountById(comment.userId);

  return (
    <div className="text-sm flex items-center space-x-1.5">
      <p className="font-bold">{account?.displayName}</p>

      <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;
