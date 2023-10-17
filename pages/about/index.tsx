import Layout from "@/components/FirstPageLayout";
import Link from "next/link";

export default function About() {
    return (
        <Layout title="URL Shortener | uURL">
            <div className='flex flex-col justify-center items-center h-screen p-2 gap-5'>
                <div className="rounded-xl drop-shadow-lg bg-white w-[80%] lg:w-[350px] p-6">
                    <Link href={'/'}>
                        <h1 className="lg:text-4xl text-6xl font-bold">
                            u<span className="text-red-400 mt-3">URL</span>
                        </h1>
                    </Link>
                    <div className="mt-5">
                        <h1 className="font-bold text-xl">
                            About
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">Something about <b>uURL</b></p>
                        <p className="mt-4 text-sm text-gray-500">
                            I developed this stuff just for personal use. I can use this stuff as link Shortener
                        </p>
                        <p className="mt-1 text-sm text-gray-500 font-semibold">
                            -fkryakbar
                        </p>
                    </div>
                </div>

            </div>
        </Layout>
    )
}
