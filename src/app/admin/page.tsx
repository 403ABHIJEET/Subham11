"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {

    const {data: token} = useSession()
    
    if(!token || token.user.email !== "abhijeet8745@gmail.com") {
        return <div>Not Authorized</div>;
    }

    return (
        <div>Hello Admin</div>
    )
};

export default Page;
