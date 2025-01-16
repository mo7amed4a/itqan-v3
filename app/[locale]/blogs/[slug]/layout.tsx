import React from "react";

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F5F7F9] text-base text-start">
      {children}
    </div>
  );
}
