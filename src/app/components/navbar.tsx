"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-background">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <span className="text-2xl font-bold tracking-tighter sm:text-1xl xl:text-2xl/none bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#BFDBFE] bg-clip-text text-transparent">
          Zanymda.ai
        </span>
      </Link>
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
        </svg>
      </button>
      <nav className={`ml-auto flex-col lg:flex lg:flex-row gap-4 sm:gap-6 ${isOpen ? 'flex' : 'hidden'}`}>
        <Link
          href="/beta-test"
          className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Стать бета-тестером
        </Link>
        <Link
          href="/"
          className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Зарегистрироваться
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
