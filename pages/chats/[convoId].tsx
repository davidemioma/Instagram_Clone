import Head from "next/head";
import { Figtree } from "next/font/google";
import { useRouter } from "next/router";
import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import useAccountById from "@/hooks/useAccountById";
import ChatLayout from "@/components/chat/ChatLayout";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import useConversationById from "@/hooks/useConversationById";
import Body from "@/components/chat/Body";
import Form from "@/components/chat/Form";

const font = Figtree({ subsets: ["latin"] });

export default function Chat() {
  const router = useRouter();

  const { convoId } = router.query;

  const conversation = useConversationById(`${convoId}`);

  const otherUserId = useOtherUser(conversation!);

  const account = useAccountById(`${otherUserId}`);

  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Inbox</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <ChatLayout>
        <main className="w-full h-full flex flex-col">
          <div className="w-full h-14 flex items-center justify-between px-5 border-b">
            <div className="flex items-center gap-2">
              <Avatar user={account!} />

              <p className="text-sm font-semibold">{account?.displayName}</p>
            </div>

            <HiEllipsisHorizontal size={25} />
          </div>

          <Body conversationId={convoId as string} />

          <Form conversationId={convoId as string} />
        </main>
      </ChatLayout>
    </div>
  );
}
