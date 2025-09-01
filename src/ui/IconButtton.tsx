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
      className="size-8 text-xl place-items-center place-content-center rounded-full border border-base-content cursor-pointer hover:text-secondary hover:border-secondary transition-all duration-300 ease-in-out overflow-hidden"
    >
      {icon}
    </div>
  );
}
