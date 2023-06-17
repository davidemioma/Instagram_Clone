import React from "react";
import Image from "next/image";
import { AccountProps } from "@/types";
import { AiOutlineCheck } from "react-icons/ai";

interface Props {
  account: AccountProps;
  selected: AccountProps | null;
  onClick: () => void;
}

const SearchedUser = ({ account, selected, onClick }: Props) => {
  const onClickHandler = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <div
      className="w-full flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100"
      onClick={onClickHandler}
    >
      <div className="flex items-center gap-2">
        <div className="relative w-9 h-9 rounded-full overflow-hidden cursor-pointer">
          <Image
            className="object-cover"
            src={
              account?.profileUrl ||
              account?.photoUrl ||
              "/assets/no-profile.jpeg"
            }
            fill
            alt=""
          />
        </div>

        <p className="text-sm font-semibold">{account.displayName}</p>
      </div>

      <div
        className={`flex items-center justify-center w-6 h-6 rounded-full ${
          account.id === selected?.id
            ? "bg-blue-400 text-white border-0"
            : "border border-gray-800"
        }`}
      >
        {account.id === selected?.id && <AiOutlineCheck size={15} />}
      </div>
    </div>
  );
};

export default SearchedUser;
