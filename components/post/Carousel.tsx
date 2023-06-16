import React, { useState } from "react";
import Image from "next/image";
import { PostFiles } from "../../types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

interface Props {
  files: PostFiles[];
  onClick?: () => void;
}

const Carousel = ({ files, onClick }: Props) => {
  const [index, setIndex] = useState(0);

  const onClickHandler = () => {
    if (onClick) {
      return onClick();
    }
  };

  const handleArrow = (direction: string) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : files.length - 1);
    }

    if (direction === "r") {
      setIndex(index !== files.length - 1 ? index + 1 : 0);
    }
  };

  return (
    <div className="relative h-full w-full bg-black">
      {index !== 0 && (
        <button className="controls left-3" onClick={() => handleArrow("l")}>
          <ChevronLeftIcon className="h-6 text-blue-500" />
        </button>
      )}

      <div
        className="h-full w-full overflow-hidden cursor-pointer"
        onClick={onClickHandler}
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${-100 * index}%)` }}
        >
          {files?.map((file, i) => (
            <div key={i} className="h-full min-w-full">
              {file?.type.includes("video") ? (
                <video
                  className="h-full w-full object-cover"
                  src={file.postContentUrl}
                  loop
                  controls
                />
              ) : (
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    className="object-cover"
                    src={file.postContentUrl}
                    fill
                    alt=""
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {index !== files?.length - 1 && (
        <button className="controls right-3" onClick={() => handleArrow("r")}>
          <ChevronRightIcon className="h-6 text-blue-500" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
