
import { LucideIcon } from "lucide-react";

export interface NavLinkProps {
  text: string;
  href: string;
  icon: LucideIcon;
  subLinks?: {
    text: string;
    href: string;
  }[];
}

export interface SubLinkProps {
  text: string;
  href: string;
}

export interface AdminSidebarProps {
  isOpen: boolean;
}

export interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  subItems?: NavLink[];
}
