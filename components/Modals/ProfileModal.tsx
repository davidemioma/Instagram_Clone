import React from "react";
import { useRouter } from "next/router";
import { auth } from "@/libs/firebase";
import { signOut } from "@firebase/auth";
import { CgProfile } from "react-icons/cg";
import { VscBookmark } from "react-icons/vsc";
import useCurrentUser from "@/hooks/useCurrentUser";
import useProfileModal from "@/hooks/useProfileModal";

const ProfileModal = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const profileModal = useProfileModal();

  const onClickHandler = () => {
    router.push(`/profile/${currentUser?.id}`);

    profileModal.onClose();
  };

  if (!profileModal.isOpen) return null;

  return (
    <div className="relative z-0 w-full max-w-5xl mx-auto">
      <div className="absolute top-20 right-6 md:right-8 z-20 bg-white w-56 rounded shadow-md after:absolute after:bottom-full after:right-0 after:block after:-translate-x-1/2 after:border-8 after:border-t-0 after:border-transparent after:border-b-white after:content-['']">
        <div
          className="flex items-center gap-3 p-2 px-4 cursor-pointer hover:bg-gray-100"
          onClick={onClickHandler}
        >
          <CgProfile />

          <p className="text-sm">Profile</p>
        </div>

        <div
          className="flex items-center gap-3 p-2 px-4 cursor-pointer hover:bg-gray-100"
          onClick={onClickHandler}
        >
          <VscBookmark />

          <p className="text-sm">Saved</p>
        </div>

        <button
          className="w-full border-t py-2 px-4 text-left text-sm hover:bg-gray-100"
          onClick={() => signOut(auth)}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
