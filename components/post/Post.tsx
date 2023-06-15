import React from "react";
import Likes from "./Likes";
import Avatar from "../Avatar";
import Actions from "./Actions";
import Comment from "./Comment";
import Carousel from "./Carousel";
import Moment from "react-moment";
import { PostProps } from "@/types";
import useLike from "@/hooks/useLike";
import CommentForm from "./CommentForm";
import useComments from "@/hooks/useComments";
import useAccountById from "@/hooks/useAccountById";
import useFilesByPostId from "@/hooks/useFilesByPostId";

interface Props {
  post: PostProps;
}

const Post = ({ post }: Props) => {
  const files = useFilesByPostId(post.id);

  const account = useAccountById(post.userId);

  const { likes } = useLike(post.id);

  const { comments } = useComments(post.id);

  return (
    <div className="bg-white w-full max-w-xl mx-auto py-3 border border-gray-300 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 px-4 mb-3">
        <Avatar user={account} />

        <p className="text-sm font-semibold">{account?.displayName}</p>
      </div>

      <Carousel files={files} />

      <div className="flex flex-col gap-3 py-3 px-4">
        <Actions postId={post.id} />

        {likes.length > 0 && <Likes likes={likes} />}

        <div className="flex items-center space-x-1 text-sm">
          <p className="font-bold">{account?.displayName}</p>

          <p>{post.caption}</p>
        </div>

        {comments.length > 0 && (
          <div className="flex flex-col gap-2">
            {comments.length > 2 && (
              <p className="cursor-pointer text-sm text-gray-500">
                View all {comments.length} comments
              </p>
            )}

            <div className="space-y-1.5">
              {comments.slice(0, 2).map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 uppercase tracking-wide">
          <Moment
            fromNow
            date={new Date(post?.timestamp?.seconds * 1000).toUTCString()}
          />
        </p>

        <CommentForm postId={post.id} />
      </div>
    </div>
  );
};

export default Post;
