import React, { useRef, useState } from "react";
import Svg from "../Svg";
import Modal from "./Modal";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAddPostModal from "@/hooks/useAddPostModal";
import { readAllFiles, uploadPost } from "@/utils/functions";

enum STEPS {
  IMAGE = 0,
  CAPTION = 1,
}

const AddPostModal = () => {
  const currentUser = useCurrentUser();

  const addPostModal = useAddPostModal();

  const [step, setStep] = useState(STEPS.IMAGE);

  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const [seletedFiles, setSelectedFiles] = useState<any>(null);

  const uploadFiles = (e: any) => {
    let AllFiles: any = [];

    [...e.target?.files].map((file) => AllFiles.push(file));

    readAllFiles(AllFiles)
      .then((result) => {
        setSelectedFiles(result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const uploadPostHandler = async () => {
    setLoading(false);

    try {
      await uploadPost(
        {
          userId: currentUser?.id!,
          caption,
        },
        seletedFiles
      );

      toast.success("Post created");

      addPostModal.onClose();

      setSelectedFiles([]);

      setCaption("");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  let content = (
    <div>
      {seletedFiles?.length > 0 ? (
        <div className="w-full h-80 overflow-hidden rounded-b-lg">
          {seletedFiles?.[0]?.type.includes("video") ? (
            <video
              className="h-full w-full object-cover"
              src={seletedFiles?.[0]?.dataUrl}
              loop
              controls
            />
          ) : (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                className="object-cover"
                src={seletedFiles?.[0]?.dataUrl}
                fill
                alt=""
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-28">
          <Svg />

          <h1 className="mt-2 mb-3 text-2xl font-light">Drag photos here</h1>

          <input
            ref={filePickerRef}
            type="file"
            accept="image/*, video/*"
            multiple
            hidden
            onChange={uploadFiles}
          />

          <button
            onClick={() => filePickerRef?.current?.click()}
            className="bg-[#458eff] text-white text-sm py-1 px-4 rounded"
          >
            Select from computer
          </button>
        </div>
      )}
    </div>
  );

  if (step === STEPS.CAPTION) {
    content = (
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-[300px] h-32 sm:h-80 rounded-bl-lg overflow-hidden">
          {seletedFiles?.[0]?.type.includes("video") ? (
            <video
              className="h-full w-full object-cover"
              src={seletedFiles?.[0]?.dataUrl}
              loop
              controls
            />
          ) : (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                className="object-cover"
                src={seletedFiles?.[0]?.dataUrl}
                fill
                alt=""
              />
            </div>
          )}
        </div>

        <div className="py-2 px-4">
          <div className="flex space-x-3 mb-3">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                className="object-cover"
                src={
                  currentUser?.profileUrl ||
                  currentUser?.photoUrl ||
                  "/assets/no-profile.jpeg"
                }
                fill
                alt=""
              />
            </div>

            <p className="font-bold text-sm">{currentUser?.displayName}</p>
          </div>

          <textarea
            className="w-full outline-none px-2 py-1"
            value={caption}
            rows={5}
            placeholder="Write a caption..."
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <Modal
      className="bg-white w-full max-w-xl rounded-xl"
      isOpen={addPostModal.isOpen}
      onClose={() => addPostModal.onClose()}
    >
      <div>
        <div className="flex items-center gap-4 py-2 px-4 border-b">
          {step === STEPS.CAPTION && (
            <BsArrowLeft
              className="cursor-pointer"
              size={25}
              onClick={() => {
                setSelectedFiles(null);

                setStep(1);
              }}
            />
          )}

          <h2 className="flex-1 font-semibold text-center">Create new Post</h2>

          {seletedFiles?.length > 0 && (
            <div>
              {step === STEPS.IMAGE ? (
                <button
                  className="text-[#458eff]"
                  onClick={() => setStep(STEPS.CAPTION)}
                >
                  Next
                </button>
              ) : (
                <button
                  className="flex items-center justify-center text-[#458eff] disabled:text-gray-500 disabled:cursor-not-allowed"
                  onClick={uploadPostHandler}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-6 h-6 rounded-full border-b border-[#458eff] animate-spin" />
                  ) : (
                    <p>Share</p>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {content}
      </div>
    </Modal>
  );
};

export default AddPostModal;
