import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center flex-col gap-4 p-4">
      <Link
        href={"/questions/addnew"}
        className="btn btn-outline btn-primary btn-wide"
      >
        Add new question
      </Link>
    </div>
  );
}
