import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
