import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <div className="h-20 bg-cyan-500 flex justify-evenly items-center px-5">
                <div>
                    <Link href="/" ><h1 className="text-4xl hidden sm:block font-extrabold">SHUBHAM</h1></Link>
                </div>
                <div className="grid grid-cols-2 gap-2 text-white">
                    <Link href="/admin" className="flex justify-center hover:bg-gray-500 rounded-md p-2">Home</Link>
                    <Link href="/admin/upload" className="flex justify-center hover:bg-gray-500 rounded-md p-2">Upload Courses</Link>
                </div>
            </div>
            {children}
        </div>
    )
}