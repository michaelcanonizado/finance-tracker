import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="min-h-screen p-6">{children}</main>;
};

export default layout;
