import Head from "next/head";
import { Figtree } from "next/font/google";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotification";
import { useEffect } from "react";
import Notification from "@/components/Notification";

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

      <main className="w-full flex items-center justify-center py-5">
        <div className="bg-white h-[85vh] w-full max-w-4xl p-5 rounded-lg shadow-md overflow-y-auto scrollbar-hide">
          <h1 className="text-xl font-semibold mb-5">Notifications</h1>

          {notifications.length > 0 ? (
            <div className="flex flex-col gap-4">
              {notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          ) : (
            <p className="text-center p-3">No New Notification!</p>
          )}
        </div>
      </main>
    </div>
  );
}
