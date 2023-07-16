import Hero from "@/components/home/Hero";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
      <Link href={"/questions/addnew"}>
        <h2 className="text-2xl font-bold text-blue-300 underline md:text-3xl">
          Add new question
        </h2>
      </Link>
    </main>
  );
}
