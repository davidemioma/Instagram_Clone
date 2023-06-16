import React from "react";
import { numberFormatter } from "@/utils/functions";

interface Props {
  data: any;
  text: string;
  isFollower?: boolean;
  onClick?: () => void;
}

const LargeScreen = ({ data, text, isFollower, onClick }: Props) => {
  const number = numberFormatter(data.length);

  const onClickHandler = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <div className="flex items-center space-x-1" onClick={onClickHandler}>
      <div className="font-bold">
        {data?.length > 999 ? <p>{number}</p> : <p>{data?.length}</p>}
      </div>

      {isFollower ? (
        <p>
          {text}
          {data?.length > 1 && "s"}
        </p>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};

export default LargeScreen;
