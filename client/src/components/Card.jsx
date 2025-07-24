import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};


export const Separator = ({ className = "" }) => {
  return <hr className={`border-t border-gray-300 dark:border-gray-600 my-4 ${className}`} />;
};
