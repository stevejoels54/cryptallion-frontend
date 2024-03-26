import AppLayout from "@/layouts/AppLayout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeMenu="5">{children}</AppLayout>;
}
