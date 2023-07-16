import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="container mx-auto">
        <Link href="/">Home</Link>
      </div>

      {children}
    </section>
  );
}
