import { PostProps } from "@/types";
import { create } from "zustand";

interface ModalProps {
  isOpen: boolean;
  post: PostProps | null;
  onOpen: () => void;
  onClose: () => void;
  setPost: (post: PostProps | null) => void;
}

const usePostModal = create<ModalProps>((set) => ({
  isOpen: false,
  post: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setPost: (post) => set({ post }),
}));

export default usePostModal;
