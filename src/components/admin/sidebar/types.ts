
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavLinkProps {
  icon: LucideIcon;
  text: string;
  href: string;
  subLinks?: { text: string; href: string }[];
}

export interface AdminSidebarProps {
  isOpen: boolean;
}
