import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Visual style of the badge. Maps to the two badge types in the design:
 * - "discount"  → solid violet pill, e.g. "Save 22%"
 * - "selected"  → soft neutral pill, e.g. "2 selected"
 * Plus a couple of general-purpose variants for reuse elsewhere.
 */
export type BadgeVariant =
    | "discount"
    | "selected"
    | "success"
    | "warning"
    | "neutral"
    | "outline";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
    /** Badge text content, e.g. "Save 22%" or "2 selected" */
    label: string;
    /** Visual style. Default: "neutral" */
    variant?: BadgeVariant;
    /** Pill size. Default: "md" */
    size?: BadgeSize;
    /** Optional icon rendered before the label (lucide-react icon or any node) */
    icon?: ReactNode;
    /** Position the badge absolutely in the top-left of a relative parent (e.g. on top of a ProductCard image) */
    floating?: boolean;
    /** Extra classes for one-off overrides */
    className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
    discount: "bg-violet-600 text-white",
    selected: "bg-muted text-muted-foreground",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-800",
    neutral: "bg-secondary text-secondary-foreground",
    outline: "border border-border bg-transparent text-foreground",
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
};

/**
 * Badge
 * -----
 * A small pill used for discount call-outs ("Save 22%"), selection counts
 * ("2 selected"), or general status labels.
 *
 * Usage:
 * ```tsx
 * <Badge label="Save 22%" variant="discount" floating />
 * <Badge label="2 selected" variant="selected" />
 * ```
 */
export function Badge({
    label,
    variant = "neutral",
    size = "md",
    icon,
    floating = false,
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full font-semibold leading-none",
                VARIANT_CLASSES[variant],
                SIZE_CLASSES[size],
                floating && "absolute left-3 top-3 z-10 shadow-sm",
                className,
            )}
        >
            {icon}
            {label}
        </span>
    );
}