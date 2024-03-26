import AppLayout from "@/layouts/AppLayout";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeMenu="3">{children}</AppLayout>;
}
