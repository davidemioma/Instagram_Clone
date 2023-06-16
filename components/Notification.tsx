import React, { useMemo } from "react";
import Moment from "react-moment";
import Avatar from "./Avatar";
import { NotificationProps } from "@/types";
import useAccountById from "@/hooks/useAccountById";

interface Props {
  notification: NotificationProps;
}

const Notification = ({ notification }: Props) => {
  const account = useAccountById(`${notification.userId}`);

  const text = useMemo(
    () =>
      `${
        notification?.task === "follower"
          ? "started following you"
          : "likes your post"
      }`,
    [notification?.task]
  );

  return (
    <div className="flex items-center gap-2">
      <Avatar user={account} />

      <p className="flex-1 text-xs sm:text-sm font-light">
        <span className="font-semibold">{account?.displayName}</span> {text}
      </p>

      <p className="text-xs sm:text-sm">
        <Moment
          fromNow
          date={new Date(notification?.timestamp?.seconds * 1000).toUTCString()}
        />
      </p>
    </div>
  );
};

export default Notification;
