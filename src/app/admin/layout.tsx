import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Portfolio admin panel",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
