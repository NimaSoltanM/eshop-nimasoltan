"use client";

import { logOut } from "@/lib/auth/lucia-helper";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function LogoutMenuItem() {
  return (
    <DropdownMenuItem
      onClick={() => {
        logOut();
      }}
    >
      Logout
    </DropdownMenuItem>
  );
}
