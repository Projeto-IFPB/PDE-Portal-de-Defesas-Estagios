import type { ReactNode } from "react";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  size?: "sm" | "lg";
}

export default function SectionHeader({ icon, title, size = "sm" }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className={`font-semibold text-gray-800 ${size === "lg" ? "text-lg" : "text-base"}`}>
        {title}
      </h3>
    </div>
  );
}
