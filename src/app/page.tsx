import Image from "next/image";
import AppLayout from "@/layouts/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </AppLayout>
  );
}
