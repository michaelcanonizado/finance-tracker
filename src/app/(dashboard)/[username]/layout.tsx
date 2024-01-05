import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex min-h-screen flex-col p-6">{children}</main>;
};

export default layout;
