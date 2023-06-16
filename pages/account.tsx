import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { BsInstagram } from "react-icons/bs";
import { uploadImage } from "../utils/functions";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { toast } from "react-hot-toast";

const font = Figtree({ subsets: ["latin"] });

export default function Account() {
  const currentUser = useCurrentUser();

  const [loading, setIsLoading] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const [seletedFile, setSeletedFile] = useState<any>(null);

  const imgSrc =
    currentUser?.profileUrl ||
    currentUser?.photoUrl ||
    "/assets/no-profile.jpeg";

  const [phoneNo, setPhoneNo] = useState("");

  const uploadImageHandler = (e: React.FormEvent) => {
    uploadImage(e, setSeletedFile);
  };

  const updateProfile = useUpdateProfile();

  const updateProfileHandler = () => {
    setIsLoading(true);

    updateProfile({
      phoneNo,
      selectedFile: seletedFile || "",
    })
      .then(() => {
        toast.success("Profile updated");

        setSeletedFile(null);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setPhoneNo(currentUser?.phoneNo!);
  }, [currentUser]);

  return (
    <div className={`h-[calc(100vh-64px)] ${font.className}`}>
      <Head>
        <title>Account Settings</title>

        <link rel="icon" href="/logo.webp" />
      </Head>

      <main className="w-full h-full flex items-center justify-center overflow-hidden">
        <div className="bg-white w-full h-[80vh] max-w-lg rounded-lg p-5 border">
          <div className="relative w-32 md:w-40 h-16 md:h-20 mx-auto overflow-hidden">
            <Image
              className="object-contain"
              src="/assets/instagram.png"
              fill
              alt=""
            />
          </div>

          <div className="relative w-20 h-20 mx-auto rounded-full my-4 overflow-hidden">
            <Image
              className="object-cover"
              src={seletedFile || imgSrc}
              fill
              alt=""
            />
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <div className="input-container">
              <label className="label">Full Name</label>

              <p className="input">{currentUser?.displayName}</p>
            </div>

            <div className="input-container">
              <label className="label">Email</label>

              <p className="input">{currentUser?.email}</p>
            </div>

            <div className="input-container">
              <label className="label">Phone Number</label>

              <input
                className="input"
                value={phoneNo}
                type="text"
                disabled={loading}
                placeholder="xxx xxxx xxxx xx"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            <div className="input-container">
              <label className="label">Profile Picture</label>

              <BsInstagram
                size={20}
                className="cursor-pointer hover:animate-bounce"
                onClick={
                  !seletedFile
                    ? () => filePickerRef?.current?.click()
                    : () => setSeletedFile(null)
                }
              />

              <input
                ref={filePickerRef}
                type="file"
                accept="image/*"
                disabled={loading}
                hidden
                onChange={uploadImageHandler}
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              className="bg-[#458eff] flex items-center justify-center disabled:bg-blue-200 py-1 rounded text-white w-10/12 hover:scale-105 transition-transform duration-200"
              onClick={updateProfileHandler}
              disabled={loading}
            >
              {loading ? (
                <div className="w-7 h-7 rounded-full border-b border-white animate-spin" />
              ) : (
                <p>Update Profile</p>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
