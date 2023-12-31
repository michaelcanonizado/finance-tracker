import React from "react";

import { twMerge } from "tailwind-merge";

const LandingNavbarLinks = ({ className }: { className?: string }) => {
  return (
    <ul
      className={twMerge(
        "flex flex-row gap-4 bg-background text-foreground",
        className,
      )}
    >
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
      <li className="">Link</li>
    </ul>
  );
};

export default LandingNavbarLinks;
