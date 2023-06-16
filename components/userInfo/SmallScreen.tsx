import React from "react";
import { numberFormatter } from "@/utils/functions";
import useFollowersModal from "@/hooks/useFollowersModal";
import useFollowingsModal from "@/hooks/useFollowingsModal";

interface Props {
  postsLength: number;
  followersLength: number;
  followingsLength: number;
}

const SmallScreen = ({
  postsLength,
  followersLength,
  followingsLength,
}: Props) => {
  const followersModal = useFollowersModal();

  const followingsModal = useFollowingsModal();

  return (
    <div className="sm:hidden grid grid-cols-3 justify-items-center w-full border-t border-gray-300 p-3">
      <div className="flex flex-col items-center">
        <div className="font-bold">
          {postsLength > 999 ? (
            <p>{numberFormatter(postsLength)}</p>
          ) : (
            <p>{postsLength}</p>
          )}
        </div>

        <p className="text-gray-500">Post{postsLength > 1 && "s"}</p>
      </div>

      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => followersModal.onOpen()}
      >
        <div className="font-bold">
          {followersLength > 999 ? (
            <p>{numberFormatter(followersLength)}</p>
          ) : (
            <p>{followersLength}</p>
          )}
        </div>

        <p className="text-gray-500">Follower{followersLength > 1 && "s"}</p>
      </div>

      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => followingsModal.onOpen()}
      >
        <div className="font-bold">
          {followingsLength > 999 ? (
            <p>{numberFormatter(followingsLength)}</p>
          ) : (
            <p>{followingsLength}</p>
          )}
        </div>

        <p className="text-gray-500">Following</p>
      </div>
    </div>
  );
};

export default SmallScreen;
