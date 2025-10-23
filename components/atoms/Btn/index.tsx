import { AtomProps } from "@/types";
import React from "react";
interface BtnProps extends AtomProps {
  onClick?: () => void;
}

const Btn = ({ children, onClick }: BtnProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Btn;
