import React from "react";
import Head from "next/head";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden animate-pulse">
      <Head>
        <title>Instagram</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <div className="absolute object-contain top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-40 h-40 overflow-hidden">
          <Image className="object-contain" fill src="/logo.webp" alt="" />
        </div>
      </div>

      <img
        className="absolute w-44 object-contain bottom-3 left-1/2 -translate-x-1/2"
        loading="lazy"
        src="/assets/meta.png"
        alt=""
      />
    </div>
  );
};

export default Loading;
