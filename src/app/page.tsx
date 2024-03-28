import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="/logo.svg"
        alt="Logo"
        className="w-80"
        width={300}
        height={300}
      />
      <h1 className="text-6xl font-bold">Welcome to cryptallion</h1>
      <p className="mt-3 text-2xl">Get started by editing</p>
    </div>
  );
}
