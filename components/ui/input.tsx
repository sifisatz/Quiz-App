"use client";

import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";



// Input component
const Input = React.forwardRef<
    React.ElementRef<"input">,
    React.ComponentPropsWithoutRef<"input"> & { label: string; id: string }
>(({ label, id, className, ...props }, ref) => (
    <div className="w-full mb-0">
        <LabelPrimitive.Root htmlFor={id} className="block mb-2 font-medium">
            {label}
        </LabelPrimitive.Root>
        <input
            ref={ref}
            id={id}
            className={cn(
                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                className
            )}
            {...props}

        />
    </div>
));
Input.displayName = "Input";

export default Input;
