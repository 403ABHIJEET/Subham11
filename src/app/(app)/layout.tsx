import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[url('/back-home.jpg')] bg-cover mb-40">
            <div className=" px-20">
                <div className="">
                    <Navbar />
                    <div className="flex">
                        <div>
                            <h1 className="w-2/5 text-4xl font-bold flex flex-col justify-evenly">
                                <span className="text-cyan-500 text-7xl font-bold mb-10">Best Online Learning Platform</span>
                                <br />
                                <span>
                                    Learn Computer Courses from your own place.
                                </span>
                            </h1>
                        </div>
                        <Image src="/header.svg" width={500} height={500} alt="img" />
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}