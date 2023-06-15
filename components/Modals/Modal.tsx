import React from "react";
import { BiX } from "react-icons/bi";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose, className }: Props) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/70" onClick={onClose} />

      <button className="fixed top-5 right-5 z-50" onClick={onClose}>
        <BiX size={40} color="#fff" />
      </button>

      <div
        className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
