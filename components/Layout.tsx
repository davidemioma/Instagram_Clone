import React from "react";
import Header from "./header/Header";
import AddPostModal from "./Modals/AddPostModal";
import ProfileModal from "./Modals/ProfileModal";
import useProfileModal from "@/hooks/useProfileModal";
import Followers from "./Modals/follow/Followers";
import Followings from "./Modals/follow/Followings";
import PostModal from "./Modals/PostModal";
import ConversationModal from "./Modals/ConversationModal";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const profileModal = useProfileModal();

  const closeAllModals = () => {
    profileModal.isOpen && profileModal.onClose();
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="bg-gray-50 w-full h-full overflow-y-auto">
        <Header />

        <AddPostModal />

        <ProfileModal />

        <Followers />

        <Followings />

        <PostModal />

        <ConversationModal />

        <div
          className="mt-16 w-full h-[calc(100vh-64px)]"
          onClick={closeAllModals}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
