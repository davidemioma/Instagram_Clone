import Head from "next/head";
import { Figtree } from "next/font/google";
import ChatLayout from "@/components/chat/ChatLayout";

const font = Figtree({ subsets: ["latin"] });

export default function Chat() {
  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Inbox</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <ChatLayout>
        <div>Chat</div>
      </ChatLayout>
    </div>
  );
}
