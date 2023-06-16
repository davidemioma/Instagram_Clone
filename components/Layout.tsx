import React from "react";
import Header from "./header/Header";
import AddPostModal from "./Modals/AddPostModal";
import ProfileModal from "./Modals/ProfileModal";
import useProfileModal from "@/hooks/useProfileModal";
import Followers from "./Modals/follow/Followers";
import Followings from "./Modals/follow/Followings";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const profileModal = useProfileModal();

  const closeAllModals = () => {
    profileModal.isOpen && profileModal.onClose();
  };

  return (
    <div className="bg-gray-50 w-screen h-screen overflow-y-auto">
      <Header />

      <AddPostModal />

      <ProfileModal />

      <Followers />

      <Followings />

      <div className="mt-16 w-full h-full" onClick={closeAllModals}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
