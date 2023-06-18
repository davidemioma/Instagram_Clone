import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderItem from "./HeaderItem";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAddPostModal from "@/hooks/useAddPostModal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoPaperPlaneOutline } from "react-icons/io5";
import useProfileModal from "@/hooks/useProfileModal";
import { AiFillHome, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Header = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const addPostModal = useAddPostModal();

  const profileModal = useProfileModal();

  return (
    <div className="fixed top-0 z-30 flex items-center justify-center bg-white w-full h-16 shadow-md">
      <div className="w-full max-w-5xl flex items-center justify-between px-6 md:px-8">
        <Link href="/">
          <div className="relative w-24 h-12 sm:w-32 sm:h-16">
            <Image
              className="object-contain"
              src="/assets/instagram.png"
              fill
              alt=""
            />
          </div>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <HeaderItem Icon={AiFillHome} href="/" />

          <HeaderItem
            Icon={IoMdAddCircleOutline}
            onClick={() => addPostModal.onOpen()}
          />

          <div className="relative">
            <HeaderItem
              Icon={
                router.asPath === "/notifications"
                  ? AiFillHeart
                  : AiOutlineHeart
              }
              href="/notifications"
              active={router.asPath === "/notifications"}
            />

            {currentUser?.hasNotification && (
              <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full" />
            )}
          </div>

          <div className="relative">
            <HeaderItem
              Icon={IoPaperPlaneOutline}
              href="/chats"
              active={true}
            />

            {currentUser?.hasMessage && (
              <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full" />
            )}
          </div>

          <HeaderItem
            imgSrc={
              currentUser?.profileUrl ||
              currentUser?.photoUrl ||
              "/assets/no-profile.jpeg"
            }
            onClick={() => profileModal.toggle()}
            active={profileModal.isOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
