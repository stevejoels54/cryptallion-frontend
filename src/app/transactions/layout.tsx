import AppLayout from "@/layouts/AppLayout";

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeMenu="2">{children}</AppLayout>;
}
