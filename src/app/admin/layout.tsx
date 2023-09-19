"use client";

import {
  LuLayoutDashboard as DashboardIcon,
  LuLayers as ExamIcon,
  LuListChecks as QuestionIcon,
  LuLayoutList as QuestionSetIcon,
  LuUser as UserIcon,
} from "react-icons/lu";

import MainLayout from "@/components/layout/MainLayout";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const adminNavItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Questions",
    href: "/admin/question",
    icon: QuestionIcon,
  },
  {
    label: "Question Sets",
    href: "/admin/question-set",
    icon: QuestionSetIcon,
  },
  {
    label: "Exams",
    href: "/admin/exam",
    icon: ExamIcon,
  },
  {
    label: "User Management",
    href: "/admin/user-management",
    icon: UserIcon,
  },
];

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <MainLayout navLinks={adminNavItems}>{children}</MainLayout>;
}
