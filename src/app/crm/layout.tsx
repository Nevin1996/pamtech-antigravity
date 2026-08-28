import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pamtech CRM — Admin",
  description: "Pamtech Group Centralized Lead Management System",
  robots: { index: false, follow: false },
};

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
