'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Navbar = () => {

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  return (
    <div className={cn(session ? "justify-evenly" : "justify-between", "flex items-center h-20 bg-transparent")} >
      <div>
        <h1 className="text-4xl"><Image src="/logo1.png" height={50} width={300} alt="img" /></h1>
      </div>
      <div className="w-full flex justify-center gap-3">
        <Link href="/" className={cn(session ? "block" : "hidden", "text-white hover:bg-gray-500 rounded-md p-2")} >Home</Link>
        <Link className={cn(session ? "block" : "hidden", "text-white hover:bg-gray-500 rounded-md p-2 font-semibold")} href="/dashboard" >
          Dashboard
        </Link>
      </div>
      <div className="">
        {
          initialLoading && status == "loading" ? (
            <h1>loading</h1>
          ) : (
            !session ? (
              <div className="">
                <Button onClick={() => signIn("google")}>Login</Button>
              </div>
            ) : (
              <div className="flex gap-3 justify-center items-center">
                <Button onClick={() => signOut()} variant="destructive">
                  Logout
                </Button>
                <Link href="/profile">
                  <Avatar>
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
