import React from "react";
import useLike from "@/hooks/useLike";
import useBookmark from "@/hooks/useBookmark";
import { BiMessageRounded } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  postId: string;
}

const Actions = ({ postId }: Props) => {
  const { hasLiked, likePost } = useLike(postId);

  const { hasBookmarked, bookmarkPost } = useBookmark(postId);

  return (
    <div className="flex items-center gap-2">
      <button onClick={likePost}>
        {hasLiked ? (
          <AiFillHeart size={25} className="on-hover text-red-500" />
        ) : (
          <AiOutlineHeart size={25} className="on-hover" />
        )}
      </button>

      <button className="flex-1">
        <BiMessageRounded size={25} />
      </button>

      <button onClick={bookmarkPost}>
        {hasBookmarked ? (
          <BsBookmarkFill size={22} className="on-hover" />
        ) : (
          <BsBookmark size={22} className="on-hover" />
        )}
      </button>
    </div>
  );
};

export default Actions;
