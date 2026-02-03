"use client";
import React from "react";
import Image from "next/image";
import path from "path";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { UserButton, useUser } from '@clerk/nextjs'

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
];

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      
      {/* 1. Logo (Αριστερά) */}
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="Logo" width={160} height={40} />
      </div>

      {/* 2. Menu (Στο Κέντρο) */}
      <div className="hidden md:flex gap-8 items-center">
        {menuOptions.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2 className="text-lg hover:scale-105 transition-all hover:text-primary cursor-pointer">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* 3. Actions (Δεξιά) */}
      <div className="flex items-center gap-3">
        {isSignedIn ? (
          // ✅ ΑΝ ΕΙΝΑΙ ΣΥΝΔΕΔΕΜΕΝΟΣ: Δείχνουμε Sign Out + UserButton
          <div className="flex items-center gap-3">
            <SignOutButton>
                <Button variant="outline">Sign Out</Button>
            </SignOutButton>
            <UserButton />
          </div>
        ) : (
          // ❌ ΑΝ ΔΕΝ ΕΙΝΑΙ ΣΥΝΔΕΔΕΜΕΝΟΣ: Δεν δείχνουμε τίποτα εδώ (το Get Started αρκεί)
          null
        )}
        
        {/* Το Get Started μένει πάντα εδώ και λειτουργεί ως Login όταν είσαι έξω */}
        <SignInButton mode="modal">
            <Button>Get Started</Button>
        </SignInButton>
      </div>
    </div>
  );
}

export default Header;