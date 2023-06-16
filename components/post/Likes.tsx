import React from "react";
import Avatar from "../Avatar";
import { LikeProps } from "@/types";
import useAccountById from "@/hooks/useAccountById";
import { numberFormatter } from "@/utils/functions";

interface Props {
  likes: LikeProps[];
}

const Likes = ({ likes }: Props) => {
  const account = useAccountById(likes[0]?.id);

  const sec_Acc = useAccountById(`${likes[1]?.id}`);

  return (
    <div className="flex text-sm items-center space-x-1">
      <Avatar user={account} />

      <p>
        Liked by <span className="font-bold">{likes[0]?.displayName}</span>
      </p>

      {likes?.length > 1 && (
        <div className="hidden sm:inline">
          {likes?.length > 2 ? (
            <p>
              and{" "}
              <span className="font-bold">
                {numberFormatter(likes.length - 1)} others
              </span>
            </p>
          ) : (
            <p>
              and <span className="font-bold">{sec_Acc?.displayName}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Likes;
