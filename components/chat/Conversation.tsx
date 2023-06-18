import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ConversationProps } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAccountById from "@/hooks/useAccountById";
import useMessagesByConvoId from "@/hooks/useMessageByConvoId";

interface Props {
  conversation: ConversationProps;
  selected?: boolean;
}

const Conversation = ({ conversation, selected }: Props) => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const otherUserId = useOtherUser(conversation);

  const account = useAccountById(`${otherUserId!}`);

  const { messages } = useMessagesByConvoId(`${conversation.id}`);

  const lastMessage = messages[messages.length - 1];

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArr = lastMessage?.hasSeen || [];

    if (!currentUser?.id) return false;

    return seenArr.findIndex((id) => id === `${currentUser.id}`) !== -1;
  }, [currentUser?.id, lastMessage]);

  const onClick = useCallback(() => {
    router.push(`/chats/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  return (
    <div
      className={`${
        selected && "bg-gray-100"
      } px-5 py-4 hover:bg-gray-100 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className="relative w-9 h-9 rounded-full overflow-hidden cursor-pointer">
          <Image
            className="object-cover"
            src={
              account?.profileUrl ||
              account?.photoUrl ||
              "/assets/no-profile.jpeg"
            }
            fill
            alt=""
          />
        </div>

        <div className="flex flex-1 flex-col text-left">
          <p className="text-sm font-medium text-gray-900">
            {account?.displayName}
          </p>

          <p
            className={`text-sm ${
              hasSeen ? "text-gray-500" : "font-medium text-black"
            } truncate`}
          >
            {lastMessage?.message || "Started a conversation"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
