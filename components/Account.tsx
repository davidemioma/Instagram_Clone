import React, { useState } from "react";
import { AccountProps } from "@/types";
import Avatar from "./Avatar";
import useFollowing from "@/hooks/useFollowing";
import { toast } from "react-hot-toast";

interface Props {
  account: AccountProps;
}

const Account = ({ account }: Props) => {
  const { followUser } = useFollowing(account.id);

  const [isLoading, setIsLoading] = useState(false);

  const followHandler = () => {
    if (!account) return;

    setIsLoading(true);

    followUser()
      .then(() => {
        toast.success(`You followed ${account.displayName}`);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-3">
        <Avatar user={account} />

        <p className="font-bold">{account.displayName}</p>
      </div>

      <button
        className="text-[#458eff] font-bold disabled:cursor-not-allowed disabled:opacity-75 transition"
        onClick={followHandler}
        disabled={isLoading}
      >
        Follow
      </button>
    </div>
  );
};

export default Account;
