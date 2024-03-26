import AppLayout from "@/layouts/AppLayout";

export default function CryptoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeMenu="4">{children}</AppLayout>;
}
