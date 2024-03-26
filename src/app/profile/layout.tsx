import AppLayout from "@/layouts/AppLayout";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeMenu="3">{children}</AppLayout>;
}
