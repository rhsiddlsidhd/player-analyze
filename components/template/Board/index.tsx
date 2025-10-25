import React from "react";

const Board = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full bg-theme-white rounded-2xl">{children}</section>
  );
};

export default Board;
