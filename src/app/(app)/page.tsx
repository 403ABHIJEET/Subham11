"use client";
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
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const Page = () => {
    const [posts, setPosts] = useState<Post[]>([])
    //const [loading, setLoading] = useState<boolean>(false)

    const fetchPosts = async () => {
        try {
            //setLoading(true);
            const response = await fetch("/api/course");
            const data = await response.json();
            setPosts(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            //setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts()
    }, [setPosts])

    return (
        <div className="mt-16">
            <h1 className="font-extrabold text-5xl text-center mb-24">OUR COURSES</h1>
            <AnimatePresence mode="wait" >
                <div className="flex flex-col sm:flex-row items-center gap-7" >
                {
                  posts.map((post, index: number) => {
                        return (
                            <motion.div key={index}
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className=""
                                >
                                <Card className="w-80" >
                                    <CardHeader>
                                        <CardTitle className="text-center" >{post.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex justify-center items-center min-h-[200px]">
                                        <Link href={post.image} >
                                            <Image src={post.image} width={200} height={200} alt="img" />
                                        </Link>
                                    </CardContent>
                                    <CardFooter className="block">
                                        <CardDescription>
                                            {post.description}
                                        </CardDescription>
                                        <div className="flex justify-evenly py-4">
                                            <Button>Open</Button>
                                            <Button className="bg-blue-500 hover:bg-blue-700" >
                                                <Link href={post.url} >Visit</Link>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )
                    })
                  }
                  </div>
            </AnimatePresence>
        </div>
    )
};

export default Page;
