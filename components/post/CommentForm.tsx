import useComments from "@/hooks/useComments";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineEmojiHappy } from "react-icons/hi";

interface Props {
  postId: string;
}

const CommentForm = ({ postId }: Props) => {
  const [text, setText] = useState("");

  const { addComment } = useComments(postId);

  const [isLoading, setIsLoading] = useState(false);

  const addCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if (!text.trim()) return;

    e.preventDefault();

    addComment(text)
      .then(() => {
        toast.success("Comment added");

        setText("");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      className="flex items-center gap-2 border-t pt-2"
      onSubmit={addCommentHandler}
    >
      <div className="flex-1 flex items-center gap-2">
        <HiOutlineEmojiHappy size={20} />

        <input
          className="flex-1 outline-none"
          value={text}
          type="text"
          placeholder="Add a comment..."
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center text-[#458eff] disabled:text-gray-500 disabled:cursor-not-allowed font-bold"
        disabled={isLoading || !text.trim()}
      >
        {isLoading ? (
          <div className="w-6 h-6 rounded-full border-b border-[#458eff] animate-spin" />
        ) : (
          <p>post</p>
        )}
      </button>
    </form>
  );
};

export default CommentForm;
