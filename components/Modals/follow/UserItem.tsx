import React, { useState } from "react";
import { followProps } from "@/types";
import { toast } from "react-hot-toast";
import Avatar from "@/components/Avatar";
import { ImUserCheck } from "react-icons/im";
import useFollowing from "@/hooks/useFollowing";
import useAccountById from "@/hooks/useAccountById";
import useCurrentUser from "@/hooks/useCurrentUser";

interface Props {
  user: followProps | null;
  modal?: any;
}

const UserItem = ({ user, modal }: Props) => {
  const currentUser = useCurrentUser();

  const account = useAccountById(user?.id!);

  const [loading, setLoading] = useState(false);

  const { isFollowing, followUser } = useFollowing(account?.id!);

  const onClickHandler = () => {
    if (!account) return;

    setLoading(true);

    followUser()
      .then(() => {
        toast.success(
          `You ${isFollowing ? "Unfollowed" : "Followed"} ${
            account.displayName
          }`
        );
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center gap-3">
      <div onClick={() => modal?.onClose()}>
        <Avatar user={account} />
      </div>

      <p className="flex-1 text-sm font-semibold">{account?.displayName}</p>

      {account?.id !== currentUser?.id && (
        <button
          className={`${
            isFollowing ? "unfollowBtn" : "followBtn"
          } disabled:cursor-not-allowed`}
          onClick={onClickHandler}
          disabled={loading}
        >
          {isFollowing ? <ImUserCheck size={20} /> : <p>Follow</p>}
        </button>
      )}
    </div>
  );
};

export default UserItem;
