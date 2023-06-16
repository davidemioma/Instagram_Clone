import React from "react";
import Image from "next/image";
import { PostProps } from "@/types";
import useLike from "@/hooks/useLike";
import { FaComment } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import useComments from "@/hooks/useComments";
import { numberFormatter } from "@/utils/functions";
import useFilesByPostId from "@/hooks/useFilesByPostId";

interface Props {
  post: PostProps;
}

const UserPost = ({ post }: Props) => {
  const { likes } = useLike(post?.id!);

  const { comments } = useComments(post?.id!);

  const files = useFilesByPostId(post?.id!);

  return (
    <div className="group relative w-full h-36 md:h-56 lg:h-72 cursor-pointer overflow-hidden">
      {files?.[0]?.postContentUrl && (
        <Image
          className="object-cover"
          src={files[0].postContentUrl}
          fill
          alt=""
        />
      )}

      <div className="absolute z-10 top-0 w-full h-full bg-black/25 opacity-0 group-hover:opacity-100 transition" />

      <div className="absolute z-20 text-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-2">
            <AiFillHeart size={20} />

            {likes.length > 999 ? (
              <p>{numberFormatter(likes.length)}</p>
            ) : (
              <p>{likes.length}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <FaComment size={20} />

            {comments.length > 999 ? (
              <p>{numberFormatter(comments.length)}</p>
            ) : (
              <p>{comments.length}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
