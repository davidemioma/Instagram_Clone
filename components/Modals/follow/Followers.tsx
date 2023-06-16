import React from "react";
import Modal from "../Modal";
import UserItem from "./UserItem";
import { useRouter } from "next/router";
import useFollowing from "@/hooks/useFollowing";
import useAccountById from "@/hooks/useAccountById";
import useFollowersModal from "@/hooks/useFollowersModal";

const Followers = () => {
  const router = useRouter();

  const { id } = router.query;

  const followersModal = useFollowersModal();

  const { followers } = useFollowing(id as string);

  if (!id) return null;

  if (!followers) return null;

  return (
    <Modal
      className="bg-white w-[90%] max-w-md h-64 rounded-xl"
      isOpen={followersModal.isOpen}
      onClose={() => followersModal.onClose()}
    >
      <div className="flex flex-col">
        <div className="w-full flex justify-center items-center h-12 border-b">
          <h1 className="text-lg font-semibold">Followers</h1>
        </div>

        <div className="h-[calc(256px-48px)] flex flex-col gap-3 py-2 px-3 overflow-y-auto scrollbar-hide">
          {followers.map((follower) => (
            <UserItem key={follower.id} user={follower} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default Followers;
