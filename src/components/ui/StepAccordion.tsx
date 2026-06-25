// import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
// lib
import { cn } from "@/lib/utils/cn";
// icon
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
// ------------------------------------------------------------------
 interface StepAccordionProps {
  contentId: string;
  title: string;
  icon?: ReactNode;
  eyebrow?: string;
  badge?: string;
  disabled?: boolean;
  isOpenByDefault?: boolean;
  children: ReactNode;
  className?: string;
}
export function StepAccordion({
  contentId,
  title,
  icon: Icon,
  eyebrow,
  isOpenByDefault,
  badge,
  disabled = false,
  children,
  className,
}: StepAccordionProps) {

  const [open, setOpen] = useState(isOpenByDefault);

  return (
    <div
      className={cn(
        "rounded-[10px]   transition-colors hover:bg-[#EDF4FF]",
        disabled && "opacity-60 ",
        className,
        open && "bg-[#EDF4FF]"
      )}
    >

      <p className="text-sm p-3.75 pb-1 text-gray-mid uppercase tracking-wide font-normal">
        {eyebrow}
      </p>

      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center border-y border-gray-mid justify-between gap-3  px-3.75 py-5 text-left",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ",
          !disabled && "cursor-pointer",
          open && 'border-b-0'
        )}
      >


          <div className="flex gap-2 ">
            <span>
              {Icon}
            </span>
            <h2 className="text-dark-black font-semibold text-lg md:text-[22px] leading-tight">{title}</h2>
          </div>

        <div className="flex items-center gap-2">
          {badge && (
            <p className="text-primary text-sm">{badge}</p>
          )}
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              "h-3 w-3 text-primary transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </div>

      </button>

      <div
        id={contentId}
        role="region"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className=" px-4 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}