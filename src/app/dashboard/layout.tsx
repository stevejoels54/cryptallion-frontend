import AppLayout from "@/layouts/AppLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeMenu="1">{children}</AppLayout>;
}
