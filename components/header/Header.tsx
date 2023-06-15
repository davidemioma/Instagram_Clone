import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderItem from "./HeaderItem";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAddPostModal from "@/hooks/useAddPostModal";
import { IoMdAddCircleOutline } from "react-icons/io";
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

        <div className="flex items-center gap-4">
          <HeaderItem Icon={AiFillHome} href="/" />

          <HeaderItem
            Icon={IoMdAddCircleOutline}
            onClick={() => addPostModal.onOpen()}
          />

          <HeaderItem
            Icon={
              router.asPath === "/notifications" ? AiFillHeart : AiOutlineHeart
            }
            href="/notifications"
            active={router.asPath === "/notifications"}
          />

          <HeaderItem
            imgSrc={
              currentUser?.profileUrl ||
              currentUser?.photoUrl ||
              "/assets/no-profile.jpeg"
            }
            onClick={() => profileModal.toggle()}
            active={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
