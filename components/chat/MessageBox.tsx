import React from "react";
import { MessageProps } from "@/types";

interface Props {
  message: MessageProps;
  isLast?: boolean;
}

const MessageBox = ({ message, isLast }: Props) => {
  return <div>MessageBox</div>;
};

export default MessageBox;
