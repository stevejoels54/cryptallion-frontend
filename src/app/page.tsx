"use client";

import Image from "next/image";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="/images/logo.png"
        alt="Logo"
        className="w-80"
        width={300}
        height={300}
      />
      <h1 className="text-6xl font-bold">Welcome to cryptallion</h1>
      <p className="mt-3 text-2xl">
        A platform for tracking your cryptocurrency transactions
      </p>
      <div className="mt-4">
        <Button
          type="primary"
          size="large"
          onClick={() => router.push("/auth", { scroll: false })}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
