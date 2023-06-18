import React from "react";
import Avatar from "../Avatar";
import Moment from "react-moment";
import { MessageProps } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAccountById from "@/hooks/useAccountById";

interface Props {
  message: MessageProps;
  isLast?: boolean;
}

const MessageBox = ({ message, isLast }: Props) => {
  const currentUser = useCurrentUser();

  const seenId = (message.hasSeen || []).filter(
    (id) => id !== message.senderId
  )?.[0];

  const seenAccount = useAccountById(`${seenId}`);

  const account = useAccountById(`${message.senderId}`);

  const currentUserMsg = message.senderId === currentUser?.id;

  return (
    <div className={`flex gap-3 p-4 ${currentUserMsg && "justify-end"}`}>
      <div className={`${currentUserMsg && "order-2"}`}>
        <Avatar user={account!} />
      </div>

      <div className={`flex flex-col gap-2 ${currentUserMsg && "items-end"}`}>
        <p
          className={`${
            currentUserMsg ? "bg-blue-400 text-white" : "bg-gray-100"
          } w-fit rounded-full px-3 py-2 text-sm`}
        >
          {message.message}
        </p>

        {message?.timestamp?.seconds && (
          <p className="text-sm text-gray-400">
            <Moment
              fromNow
              date={new Date(message?.timestamp?.seconds * 1000).toUTCString()}
            />
          </p>
        )}

        {isLast && currentUserMsg && seenId && (
          <p className="text-sm font-light text-gray-500">{`Seen by ${seenAccount?.displayName}`}</p>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
