import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";

interface Props {
  Icon?: IconType;
  imgSrc?: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

const HeaderItem = ({ Icon, imgSrc, href, onClick, active }: Props) => {
  const onClickHandler = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link href={href || ""}>
      <div
        className="hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={onClickHandler}
      >
        {Icon && <Icon size={25} />}

        {imgSrc && (
          <div
            className={`relative w-6 h-6 rounded-full overflow-hidden hover:scale-105 transition-transform duration-200 ${
              active && "border-2 border-gray-500"
            }`}
          >
            <Image className="object-cover" src={imgSrc} fill alt="" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default HeaderItem;
