import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center flex-col">
      <Link href={"/questions/addnew"}>
        <h2 className="text-2xl font-bold text-blue-700 underline md:text-3xl">
          Add new question
        </h2>
      </Link>
      <Link href={"/questions/addnew"}>
        <h2 className="text-2xl font-bold text-blue-700 underline md:text-3xl">
          Add new exam set
        </h2>
      </Link>
    </div>
  );
}
