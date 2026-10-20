import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background text-foreground rounded-lg hover:border-foreground/20 hover:bg-muted active:bg-muted/80",
        destructive:
          "border-destructive/20 bg-background text-destructive rounded-lg hover:bg-destructive/5",
        outline:
          "border-border bg-transparent text-foreground rounded-lg hover:border-foreground/20 hover:bg-secondary",
        secondary:
          "border-border bg-secondary text-secondary-foreground rounded-lg hover:bg-muted",
        ghost: 
          "border-transparent bg-transparent text-foreground rounded-lg tracking-[0.18em] hover:border-border hover:bg-secondary",
        link: 
          "border-transparent p-0 text-foreground underline-offset-4 tracking-normal normal-case hover:underline",
        editorial:
          "rounded-none border-x-0 border-t-0 border-b border-foreground/30 bg-transparent px-0 tracking-[0.18em] hover:border-foreground",
        accent:
          "border-accent/20 bg-accent-soft text-foreground rounded-lg hover:border-accent/40 hover:bg-accent-soft/80",
        subtle:
          "border-border bg-background-alt text-foreground-muted rounded-lg hover:bg-secondary hover:text-foreground",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-[10px]",
        lg: "h-12 px-8",
        xl: "h-14 px-10 text-[12px]",
        icon: "h-10 w-10 px-0 tracking-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
