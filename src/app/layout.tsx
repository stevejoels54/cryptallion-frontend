import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import TanStackProvider from "@/components/providers/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cryptallion",
  description: "Cryptallion is a cryptocurrency portfolio tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </TanStackProvider>
      </body>
    </html>
  );
}
