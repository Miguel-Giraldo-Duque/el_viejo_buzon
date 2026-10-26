import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-base font-bold leading-tight min-h-11 px-4 py-3 cursor-pointer touch-manipulation no-underline [&_svg]:size-5 [&_svg]:shrink-0 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-[3px] border-[var(--text-strong)] hover:bg-[var(--text-strong)]",
        outline:
          "border-2 border-[var(--input)] bg-[var(--bg)] text-[var(--text-strong)] hover:bg-[var(--surface)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "default"}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
