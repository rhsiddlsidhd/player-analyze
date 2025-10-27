import React from "react";

const Board = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-theme-white flex w-full flex-col justify-center self-start rounded-2xl p-4">
      {children}
    </section>
  );
};

export default Board;
