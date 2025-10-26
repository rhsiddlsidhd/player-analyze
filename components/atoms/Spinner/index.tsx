import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-32 w-32 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
    </div>
  );
};

export default Spinner;
