import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { error: "You are Unauthorized" },
            { status: 401 }
        );
    }
    try {
        
        const data = await request.json();

        await prisma.post.create({
            data: {
                name: data.courseName,
                url: data.courseLink,
                description: data.courseDescription,
                image: data.courseImage
            }
        })
        return NextResponse.json({ message: "success"}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error"}, {status: 500})
    }
}

export async function GET() {
    try {
        const response = await prisma.post.findMany()
        return NextResponse.json({data: response, messge: "success" }, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "error"}, {status: 400})
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { error: "You are Unauthorized" },
            { status: 401 }
        );
    }

    const { searchParams } = new URL(request.url);
    const postId: string = searchParams.get('postId') ?? ""

    

    try {
        
        await prisma.post.delete({
            where: {
                id: postId
            }
        })
        return NextResponse.json({messge: "success" }, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "error"}, {status: 400})
    }
}