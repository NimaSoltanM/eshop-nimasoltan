"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Option {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export interface AdminSpeedDialProps {
  options: Option[];
}

export default function AdminSpeedDial({ options }: AdminSpeedDialProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6">
      <div className="flex flex-col items-end">
        <div
          className={`mb-2 grid grid-cols-1 gap-2 transition-all duration-300 ease-in-out ${isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
        >
          <TooltipProvider>
            {options.map((option, index) => (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={option.href}>
                      {option.icon}
                      <span className="sr-only">{option.label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{option.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        {/* Trigger Button */}
        <Button variant="secondary" size="icon" onClick={toggleOptions}>
          <Plus
            className={`h-6 w-6 transition-transform ${isOpen ? "rotate-45" : ""}`}
          />
          <span className="sr-only">Open speed dial</span>
        </Button>
      </div>
    </div>
  );
}
