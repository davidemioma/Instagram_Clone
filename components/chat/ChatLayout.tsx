import React from "react";
import Avatar from "../Avatar";
import { useRouter } from "next/router";
import Conversation from "./Conversation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import useConversationModal from "@/hooks/useConversationModal";
import useConversations from "@/hooks/useConversations";

interface Props {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: Props) => {
  const router = useRouter();

  const { convoId } = router.query;

  const currentUser = useCurrentUser();

  const conversations = useConversations();

  const conversationModal = useConversationModal();

  return (
    <div className="h-[calc(100vh-64px)] w-screen">
      <div className="w-full h-full flex items-center justify-center md:py-8">
        <div className="bg-white w-full max-w-[920px] h-full shadow-md border rounded">
          <div className="flex w-full h-full">
            <div
              className={`${
                router.asPath === "/chats"
                  ? "w-full md:w-full md:max-w-sm h-full md:border-r"
                  : "hidden md:block w-full max-w-xs h-full border-r"
              }`}
            >
              <div className="w-full h-full">
                <div className="w-full h-14 flex items-center justify-between px-5 border-b">
                  <div className="flex items-center gap-2">
                    <Avatar user={currentUser} />

                    <p className="font-semibold">{currentUser?.displayName}</p>
                  </div>

                  <HiOutlinePencilSquare
                    className="cursor-pointer"
                    size={25}
                    onClick={() => conversationModal.onOpen()}
                  />
                </div>

                <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
                  {conversations.map((conversation) => (
                    <Conversation
                      key={conversation.id}
                      conversation={conversation}
                      selected={convoId === conversation.id}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`${
                router.asPath !== "/chats"
                  ? "w-full md:w-full h-full md:border-r"
                  : "hidden md:block w-full h-full border-r"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
