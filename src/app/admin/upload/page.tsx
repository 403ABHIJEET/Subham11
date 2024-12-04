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
import { UploadDropzone } from '@/lib/uploadthing'

const formSchema = z.object({
    courseName: z.string().min(2).max(50),
    courseLink: z.string().min(2).max(100),
    courseDescription: z.string().min(2).max(200),
    courseImage: z.string().min(2).max(100),
})

const Page = () => {

    const [isSubmitting, setIsSubmitting] = useState()
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
        
    };

  return (
    <div>
        <div className='px-8'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        name="courseName"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username or Email</FormLabel>
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
                                <FormLabel>Username or Email</FormLabel>
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
                    <FormField
                        name="courseImage"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className=''>
                                <FormLabel>Upload Template</FormLabel>
                                <Input {...field} type='hidden' />
                                {
                                    image ? (
                                        <div>
                                            <Image  src={image} width={100} height={100} alt="image" />
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                                <div className='flex justify-evenly'>
                                    <UploadDropzone endpoint='imageUploader'
                                            onClientUploadComplete={(res: any) => {
                                                setImage(res[0].url)
                                            }}
                                            onUploadError={() => {
                                            alert("Error uploading")
                                        }}
                                    />
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> 
                    <Button type="submit" className='w-full' disabled={isSubmitting}>
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
