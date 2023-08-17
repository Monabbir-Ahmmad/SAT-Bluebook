import Image from "next/image";
import Link from "next/link";

type DashboardButtonProps = {
  href: string;
  image: string;
  text: string;
};

export default function DashboardButton({
  href,
  image,
  text,
}: DashboardButtonProps) {
  return (
    <Link
      href={href}
      className="border border-primary bg-white flex flex-col items-center justify-center p-6 rounded  shadow hover:shadow-lg text-primary transition-shadow"
    >
      <Image src={image} alt="" width={150} height={150} />
      <span className="text-2xl text-text-color">{text}</span>
    </Link>
  );
}
