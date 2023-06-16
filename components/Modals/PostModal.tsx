import React from "react";
import Modal from "./Modal";
import Avatar from "../Avatar";
import Moment from "react-moment";
import Likes from "../post/Likes";
import Actions from "../post/Actions";
import useLike from "@/hooks/useLike";
import Comment from "../post/Comment";
import Carousel from "../post/Carousel";
import CommentForm from "../post/CommentForm";
import usePostModal from "@/hooks/usePostModal";
import useComments from "@/hooks/useComments";
import useFilesByPostId from "@/hooks/useFilesByPostId";
import useAccountById from "@/hooks/useAccountById";

const PostModal = () => {
  const postModal = usePostModal();

  const files = useFilesByPostId(`${postModal?.post?.id}`);

  const account = useAccountById(`${postModal?.post?.userId}`);

  const { likes } = useLike(`${postModal?.post?.id}`);

  const { comments } = useComments(`${postModal?.post?.id}`);

  if (!postModal.post) return null;

  return (
    <Modal
      className="bg-white w-[80%] sm:w-[60%] md:w-1/2 lg:w-[85%] h-[70%] mt-5 md:h-[90%] md:mt-0 max-w-5xl mx-auto rounded overflow-hidden"
      isOpen={postModal.isOpen}
      onClose={() => {
        postModal.setPost(null);

        postModal.onClose();
      }}
    >
      <div className="w-full h-full">
        <div className="hidden lg:inline-flex w-full h-full">
          <div className="w-1/2 h-full overflow-hidden">
            <Carousel files={files} />
          </div>

          <div className="relative w-1/2 h-full overflow-hidden">
            <div className="h-16 flex items-center gap-3 px-4 border-b">
              <Avatar user={account} />

              <p className="text-sm font-bold">{account?.displayName}</p>
            </div>

            <div className="flex items-center gap-3 p-4 text-sm">
              <Avatar user={account} />

              <div>
                <p>
                  <span className="font-bold">{account?.displayName}</span>{" "}
                  {postModal?.post?.caption}
                </p>

                <p className="text-gray-500 text-xs">
                  Edited.{" "}
                  <Moment
                    fromNow
                    date={new Date(
                      postModal?.post?.timestamp?.seconds * 1000
                    ).toUTCString()}
                  />
                </p>
              </div>
            </div>

            <div className="h-[500px] p-6 py-2 space-y-3 overflow-y-auto scrollbar-hide">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>

            <div className="absolute bottom-0 w-full bg-white border-t">
              <div className="p-3">
                <Actions postId={`${postModal?.post?.id}`} />
              </div>

              {likes.length > 0 && (
                <div className="px-3 pb-1">
                  <Likes likes={likes} />
                </div>
              )}

              <p className="ml-3 mt-2 pb-3 lg:pb-0 lg:mb-1 text-xs text-gray-500 uppercase tracking-wide">
                <Moment
                  fromNow
                  date={new Date(
                    postModal?.post?.timestamp?.seconds * 1000
                  ).toUTCString()}
                />
              </p>

              <div className="p-3">
                <CommentForm postId={`${postModal?.post?.id}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden relative h-full">
          <div className="h-16 flex items-center gap-2 px-4">
            <Avatar user={account} />

            <p className="text-sm font-bold">{account?.displayName}</p>
          </div>

          <div className="w-full h-[calc(100%-64px)] overflow-hidden">
            <Carousel files={files} />
          </div>

          <div className="absolute bottom-0 w-full bg-white border-t">
            <div className="p-3">
              <Actions postId={`${postModal?.post?.id}`} />
            </div>

            {likes.length > 0 && (
              <div className="px-3 pb-1">
                <Likes likes={likes} />
              </div>
            )}

            <p className="ml-3 mt-2 pb-3 lg:pb-0 lg:mb-1 text-xs text-gray-500 uppercase tracking-wide">
              <Moment
                fromNow
                date={new Date(
                  postModal?.post?.timestamp?.seconds * 1000
                ).toUTCString()}
              />
            </p>

            <div className="p-3">
              <CommentForm postId={`${postModal?.post?.id}`} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
