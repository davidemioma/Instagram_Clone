import React from "react";
import { useRouter } from "next/router";
import { auth } from "@/libs/firebase";
import { signOut } from "@firebase/auth";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import useCurrentUser from "@/hooks/useCurrentUser";
import useProfileModal from "@/hooks/useProfileModal";

const ProfileModal = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const profileModal = useProfileModal();

  const onClickHandler = (href: string) => {
    router.push(href);

    profileModal.onClose();
  };

  if (!profileModal.isOpen) return null;

  return (
    <div className="fixed top-20 right-6 md:right-8 lg:right-[calc(((100vw-1024px)/2)+32px)] z-20 bg-white w-56 rounded shadow-md after:absolute after:bottom-full after:right-0 after:block after:-translate-x-1/2 after:border-8 after:border-t-0 after:border-transparent after:border-b-white after:content-['']">
      <div
        className="flex items-center gap-3 p-2 px-4 cursor-pointer hover:bg-gray-100"
        onClick={() => onClickHandler(`/profile/${currentUser?.id}`)}
      >
        <CgProfile />

        <p className="text-sm">Profile</p>
      </div>

      <div
        className="flex items-center gap-3 p-2 px-4 cursor-pointer hover:bg-gray-100"
        onClick={() => onClickHandler("/account")}
      >
        <FiSettings />

        <p className="text-sm">Account</p>
      </div>

      <button
        className="w-full border-t py-2 px-4 text-left text-sm hover:bg-gray-100"
        onClick={() => signOut(auth)}
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileModal;
