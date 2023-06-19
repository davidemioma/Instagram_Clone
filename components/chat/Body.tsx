import React, { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMessagesByConvoId from "@/hooks/useMessageByConvoId";

interface Props {
  conversationId: string;
}

const Body = ({ conversationId }: Props) => {
  const currentUser = useCurrentUser();

  const { messages, updateMessage } = useMessagesByConvoId(
    conversationId as string
  );

  const lastMessage = messages[messages.length - 1];

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentUser?.id && lastMessage?.senderId !== currentUser?.id) {
      updateMessage(lastMessage, `${currentUser?.id}`);
    }

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [updateMessage, lastMessage, currentUser?.id]);

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {messages?.map((message, i) => (
        <MessageBox
          key={message.id}
          message={message}
          isLast={messages.length - 1 === i}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default Body;
