import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/libs/firebase";

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const signInHandler = () => {
    setLoading(true);

    signInWithGoogle()
      .then(() => {
        toast.success("Login successful");

        router.push("/");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-50 w-screen h-screen flex items-center justify-center overflow-hidden">
      <Head>
        <title>Login - Instagram</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <div className="hidden md:block relative h-3/5 w-80 overflow-hidden">
        <Image
          className="object-contain"
          src="/assets/login-bg.jpeg"
          fill
          alt=""
        />
      </div>

      <div className="bg-white w-full max-w-sm p-6 border">
        <div className="relative w-36 h-16 mx-auto">
          <Image
            className="object-contain"
            src="/assets/instagram.png"
            fill
            alt=""
          />
        </div>

        <button
          className="mt-5 py-1 w-2/3 mx-auto flex items-center justify-center space-x-2 border rounded hover:scale-105 transition-transform duration-200 disabled:opacity-75"
          onClick={signInHandler}
          disabled={loading}
        >
          <FcGoogle size={20} />

          <p>Sign In With Google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
