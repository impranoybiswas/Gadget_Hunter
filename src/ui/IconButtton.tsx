import React from "react";

export default function IconButtton({
  onClick,
  icon,
}: {
  onClick?: () => void;
  icon: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className="size-8 text-xl place-items-center place-content-center rounded-full border text-base-content border-base-content/30 cursor-pointer hover:text-primary hover:border-primary hover:bg-base-200 transition-all duration-300 ease-in-out overflow-hidden"
    >
      {icon}
    </div>
  );
}
