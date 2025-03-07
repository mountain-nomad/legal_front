"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const response = await axios.get('https://legalapi-production.up.railway.app/user_info', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <header className="positon: fixed flex h-16 w-full items-center justify-between bg-background px-4 sm:px-6 md:px-8 z-20">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <span className="text-2xl font-bold tracking-tighter sm:text-1xl xl:text-1xl/none bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#BFDBFE] bg-clip-text text-transparent">
          Zanymda.ai
        </span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Link href="/" className="text-sm font-medium hover:text-primary" prefetch={false}>
          Дом
        </Link>
        {!isLoggedIn ? (
          <>
            <Link href="/login" className="text-sm font-medium hover:text-primary" prefetch={false}>
              Вход
            </Link>
            <Link href="/register" className="text-sm font-medium hover:text-primary" prefetch={false}>
              Регистрация
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout} className="text-sm font-medium hover:text-primary">
              Выход
            </button>
            <span className="text-sm font-medium">{username}</span>
          </>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[200px] md:hidden">
          <div className="grid gap-4 p-4">
            <Link href="/" className="text-sm font-medium hover:text-primary" prefetch={false}>
              Дом
            </Link>
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-primary" prefetch={false}>
                  Вход
                </Link>
                <Link href="/register" className="text-sm font-medium hover:text-primary" prefetch={false}>
                  Регистрация
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm font-medium">Рад вас видеть, {username}</span>
                <button onClick={handleLogout} className="text-sm font-medium hover:text-primary">
                  Выход
                </button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export default Navbar;
