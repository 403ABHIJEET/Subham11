'use client'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react';
import Image from 'next/image'
import GenerateThumbnail from '@/components/GenerateImage'
import { useSession } from 'next-auth/react'

const formSchema = z.object({
    courseName: z.string().min(2).max(50),
    courseLink: z.string().min(2).max(100),
    courseDescription: z.string().min(2).max(200),
    courseImage: z.string()
})

const Page = () => {

    const { data: token } = useSession()

    //const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [image, setImage] = useState('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseName: "",
            courseLink: "",
            courseDescription: "",
            courseImage: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        data.courseImage = image
        try {
            await fetch('/api/course', {
                method: "POST",
                body: JSON.stringify(data),
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    };

    if (!token || (token.user.email !== "abhijeet8745@gmail.com" && token.user.email !== "shrivastavshubham759@gmail.com" )) {
        return <div>Not Authorized</div>;
    }

    return (
        <div className=''>
            <div className='px-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className='grid grid-cols-2 gap-9'>
                            <div className='flex justify-evenly flex-col min-h-96'>
                                <FormField
                                    name="courseName"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Course Name</FormLabel>
                                            <Input {...field} type='text' />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="courseLink"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Course Link</FormLabel>
                                            <Input {...field} type='text' />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="courseDescription"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Course Description</FormLabel>
                                            <Input {...field} type='text' />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <FormField
                                    name="courseImage"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <Input {...field} type='hidden' value={image} />
                                            <div className='flex justify-center items-center flex-col'>
                                                <FormLabel className='text-center p-6' >Upload Template</FormLabel>
                                                {
                                                    image ? (
                                                        <div>
                                                            <Image src={image} width={100} height={100} alt="image" />
                                                        </div>
                                                    ) : (
                                                        <div className='h-24 w-20 border flex justify-center items-center'>Image</div>
                                                    )
                                                }
                                                <div className='flex items-center mt-4'>
                                                    {
                                                        !image ? (
                                                            <GenerateThumbnail setImage={setImage} />
                                                        ) : (
                                                            <button className='w-60 bg-red-500 hover:bg-red-700 rounded text-white h-9'
                                                                onClick={() => setImage('')}
                                                            >
                                                                Remove Image
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page
