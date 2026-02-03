import React from "react";
import Image from "next/image";
import path from "path";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const menuOptions = [
  { 
    name: "Home", 
    path: "/" 
},
  { 
    name: "Pricing", 
    path: "/pricing" 
},
  { 
    name: "Contact Us", 
    path: "/contact-us" 
},
];

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center '>
         
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt="Logo" width={160} height={40}/>
            
        </div>

        
        <div className='flex gap-8 items-center'>
            {menuOptions.map((menu, index) => (
                <Link href={menu.path} key={index}>
                <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2>
                </Link>
            ))}
        </div>

        <SignInButton mode='modal'>
        <Button>Get Started</Button>
        </SignInButton>
    </div>
  );
}
export default Header;