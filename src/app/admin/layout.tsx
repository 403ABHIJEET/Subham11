import Link from "next/link";

export default function Layout({children} : {children: React.ReactNode}) {

    return (
        <div>
            <div className="h-20 bg-cyan-500 flex justify-between items-center px-5">
                <div>
                    <h1 className="text-4xl">Shubam Page</h1>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <Link href="/admin" className="flex justify-center">Home</Link>
                    <Link href="/admin/upload" >Upload Courses</Link>
                    <div className="flex justify-center">
                        
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}