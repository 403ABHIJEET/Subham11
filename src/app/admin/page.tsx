"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { Post } from "@prisma/client";

const Page = () => {

    const { data: token } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/course");
            const data = await response.json();
            console.log(data)
            setPosts(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchPosts()
    }, [setPosts])

    const handleDelete = async (id: any) => {
        const newPosts = posts.filter((post) => post.id !== id)
        setPosts(newPosts)
        await fetch(`/api/course?postId=${id}`, {
            method: "DELETE",
        })
    }

    if (!token || token.user.email !== "abhijeet8745@gmail.com") {
        return <div>Not Authorized</div>;
    }

    return (
        <div className="m-10 grid grid-cols-4 gap-4">
            {
                posts.map((post: any, index: number) => {
                    return (
                        <Card className="w-[350px]" key={index}>
                            <CardHeader>
                                <CardTitle className="text-center" >{post.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center items-center">
                                <Image src={post.image} width={100} height={100} alt="img" />
                            </CardContent>
                            <CardFooter className="block">
                                <CardDescription>
                                    {post.description}
                                </CardDescription>
                                <div className="flex justify-evenly py-4">
                                    <Button>Open</Button>
                                    <Button onClick={() => handleDelete(post.id)} className="bg-red-500 hover:bg-red-700" >Delete</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </div>
    )
};

export default Page;
