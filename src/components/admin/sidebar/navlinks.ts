
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
  Settings,
  Tag,
  Store
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
    subItems: [
      {
        title: "Trainer Profiles",
        href: "/admin/trainers",
      },
      {
        title: "Performance Tracking",
        href: "/admin/trainers/performance",
      },
      {
        title: "Ratings",
        href: "/admin/trainers/ratings",
      },
      {
        title: "Scheduling",
        href: "/admin/trainers/scheduling",
      },
    ],
  },
  {
    title: "Shop",
    href: "/admin/shop",
    icon: ShoppingBag,
    subItems: [
      {
        title: "Dashboard",
        href: "/admin/shop",
      },
      {
        title: "Products",
        href: "/admin/shop/products",
      },
      {
        title: "Categories",
        href: "/admin/shop/categories",
      },
      {
        title: "E-Commerce",
        href: "/admin/shop/ecommerce",
      },
      {
        title: "In-Store POS",
        href: "/admin/shop/member-pos",
      },
    ],
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
    subItems: [
      {
        title: "Subscriptions",
        href: "/admin/payments/subscriptions",
      },
      {
        title: "Invoices",
        href: "/admin/payments/invoices",
      },
      {
        title: "Payment Methods",
        href: "/admin/payments/methods",
      },
    ],
  },
  {
    title: "Workouts",
    href: "/admin/workouts",
    icon: Dumbbell,
    subItems: [
      {
        title: "Programs",
        href: "/admin/workouts",
      },
      {
        title: "Exercise Library",
        href: "/admin/workouts/exercise-library",
      },
      {
        title: "Progress Tracking",
        href: "/admin/workouts/progress-tracking",
      },
      {
        title: "Reports",
        href: "/admin/workouts/generate-reports",
      },
    ],
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
