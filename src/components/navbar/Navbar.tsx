import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="sticky h-16 top-0 px-6 py-4 flex items-center bg-white z-50 shadow">
      <Link href="/">
        <h1 className="text-2xl font-bold">SAT Bluebook</h1>
      </Link>
    </nav>
  );
}

export default Navbar;
