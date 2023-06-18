import useMessagesByConvoId from "@/hooks/useMessageByConvoId";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineEmojiHappy } from "react-icons/hi";

interface Props {
  conversationId: string;
}

const Form = ({ conversationId }: Props) => {
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const { sendMessage } = useMessagesByConvoId(conversationId as string);

  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if (!message.trim()) return;

    e.preventDefault();

    setLoading(true);

    sendMessage(message)
      .then(() => {
        toast.success("Message sent");

        setMessage("");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full p-5 border-t">
      <form
        className="w-full flex items-center gap-3 py-2 px-4 border rounded-full"
        onSubmit={sendMessageHandler}
      >
        <HiOutlineEmojiHappy size={25} />

        <input
          className="flex-1 w-full focus:outline-none"
          value={message}
          type="text"
          disabled={loading}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Form;
