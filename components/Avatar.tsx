import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AccountProps } from "@/types";

interface Props {
  user: AccountProps | null;
}

const Avatar = ({ user }: Props) => {
  return (
    <Link href={`/profile/${user?.id}`}>
      <div className="relative w-7 h-7 rounded-full overflow-hidden cursor-pointer">
        <Image
          className="object-cover"
          src={user?.profileUrl || user?.photoUrl || "/assets/no-profile.jpeg"}
          fill
          alt=""
        />
      </div>
    </Link>
  );
};

export default Avatar;
