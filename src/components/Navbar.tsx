'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  return (
    <div className="flex justify-between items-center px-9 h-20 bg-cyan-500">
      <div>
        <h1 className="text-4xl">MyApp</h1>
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
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
