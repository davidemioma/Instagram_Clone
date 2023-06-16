import React from "react";
import Modal from "../Modal";
import UserItem from "./UserItem";
import { useRouter } from "next/router";
import useFollowing from "@/hooks/useFollowing";
import useFollowingsModal from "@/hooks/useFollowingsModal";

const Followings = () => {
  const router = useRouter();

  const { id } = router.query;

  const followingsModal = useFollowingsModal();

  const { followings } = useFollowing(id as string);

  if (!id) return null;

  if (!followings) return null;

  return (
    <Modal
      className="bg-white w-[90%] max-w-md h-64 rounded-xl"
      isOpen={followingsModal.isOpen}
      onClose={() => followingsModal.onClose()}
    >
      <div className="flex flex-col">
        <div className="w-full flex justify-center items-center h-12 border-b">
          <h1 className="text-lg font-semibold">Followings</h1>
        </div>

        <div className="h-[calc(256px-48px)] flex flex-col gap-3 py-2 px-3 overflow-y-auto scrollbar-hide">
          {followings.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default Followings;
