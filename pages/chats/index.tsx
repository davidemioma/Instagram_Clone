import Head from "next/head";
import { Figtree } from "next/font/google";
import ChatLayout from "@/components/chat/ChatLayout";
import { IoPaperPlaneOutline } from "react-icons/io5";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotification";
import useConversationModal from "@/hooks/useConversationModal";
import { useEffect } from "react";

const font = Figtree({ subsets: ["latin"] });

export default function Chats() {
  const currentUser = useCurrentUser();

  const conversationModal = useConversationModal();

  const { turnOffMessagesNotifications } = useNotifications(
    `${currentUser?.id}`
  );

  useEffect(() => {
    if (!currentUser?.id) return;

    turnOffMessagesNotifications();
  }, [turnOffMessagesNotifications]);

  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Inbox</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <ChatLayout>
        <main className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-28 h-28 flex items-center justify-center rounded-full border-2 border-black overflow-hidden">
              <IoPaperPlaneOutline size={50} />
            </div>

            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-lg font-semibold">Your Messages</h2>

              <p className="text-sm text-gray-500 font-light">
                Send private photos and messages to a friend or group.
              </p>
            </div>

            <button
              className="bg-blue-400 text-white py-1 px-3 rounded-lg"
              onClick={() => conversationModal.onOpen()}
            >
              Send Message
            </button>
          </div>
        </main>
      </ChatLayout>
    </div>
  );
}
