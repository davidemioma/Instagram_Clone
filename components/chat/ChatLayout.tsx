import React from "react";
import Avatar from "../Avatar";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import useConversationModal from "@/hooks/useConversationModal";

interface Props {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: Props) => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const conversationModal = useConversationModal();

  return (
    <div className="w-screen h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      <div className="bg-white w-full max-w-[920px] h-full md:h-[94%] shadow-md border rounded">
        <div className="flex w-full h-full">
          <div
            className={`${
              router.asPath === "/chats"
                ? "w-full md:w-full md:max-w-sm h-full md:border-r"
                : "hidden md:block w-full max-w-xs h-full border-r"
            }`}
          >
            <div className="w-full h-full">
              <div className="w-full h-12 flex items-center justify-between px-5 border-b">
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
  );
};

export default ChatLayout;
