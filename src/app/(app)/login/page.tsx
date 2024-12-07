'use client'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
    courseName: z.string().min(2).max(50),
    courseLink: z.string().min(2).max(100),
    courseDescription: z.string().min(2).max(200),
    courseImage: z.string()
})

const Page = () => {

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

        try {
            await fetch('/api/course', {
                method: "POST",
                body: JSON.stringify(data),
            })
        } catch (error) {
            console.log(error)
        } finally {

        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='min-w-96'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-80 h-96 flex flex-col justify-evenly">
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
                        <Button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white' >
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page

