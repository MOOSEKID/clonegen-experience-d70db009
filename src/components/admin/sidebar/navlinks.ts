
import {
  LayoutDashboard,
  UsersRound,
  CalendarDays,
  Dumbbell,
  ShoppingBag,
  CreditCard,
  BarChartBig,
  FileText,
  HelpCircle,
  Settings
} from "lucide-react";

import { NavLink } from "./types";

export const navLinks: NavLink[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/admin/members",
    icon: UsersRound,
  },
  {
    title: "Classes",
    href: "/admin/classes",
    icon: CalendarDays,
  },
  {
    title: "Trainers",
    href: "/admin/trainers",
    icon: Dumbbell,
  },
  {
    title: "Shop",
    href: "/admin/shop",
    icon: ShoppingBag,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Workouts",
    href: "/admin/workouts",
    icon: Dumbbell,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChartBig,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Support",
    href: "/admin/support",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];
