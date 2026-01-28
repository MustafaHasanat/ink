import { Play } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function NodeToggleButton({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <Play
      size={15}
      fill="lightGray"
      onClick={() => setIsOpen((prev) => !prev)}
      className="min-w-[13px] min-h-[13px]"
      style={{
        cursor: "pointer",
        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
        transition: "0.3s ease",
      }}
    />
  );
}
