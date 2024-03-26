import AppLayout from "@/layouts/AppLayout";

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeMenu="3">{children}</AppLayout>;
}
