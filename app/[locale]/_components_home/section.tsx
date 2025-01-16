import React from "react";

export default function SectionApp({
  children,
  title,
  title2,
  className,
  id
}: {
  children: React.ReactElement;
  title?: string;
  title2?: string;
  className: string;
  id?: string
}) {
  return (
    <div className="flex flex-col py-8 space-y-9" id={id ? id : ""}>
      <h2 className={`text-center text-xl md:text-2xl lg:text-3xl font-bold text-gray-500 flex justify-center gap-x-2 ${title2 && "flex-col md:flex-row"}`}>
        <span className="text-secondary">{title2}</span>
        <span>{title}</span>
      </h2>
      <div className={className}>{children}</div>
    </div>
  );
}
