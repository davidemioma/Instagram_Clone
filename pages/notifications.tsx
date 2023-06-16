import Head from "next/head";
import { Figtree } from "next/font/google";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotification";
import { useEffect } from "react";

const font = Figtree({ subsets: ["latin"] });

export default function Notifications() {
  const currentUser = useCurrentUser();

  const { notifications, turnOffNotifications } = useNotifications(
    currentUser?.id!
  );

  useEffect(() => {
    turnOffNotifications();
  }, [turnOffNotifications]);

  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Notifications</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <main></main>
    </div>
  );
}
