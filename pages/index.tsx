import Layout from "@/components/FirstPageLayout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout title="URL Shortener | uURL">
      <div className="h-screen flex-col flex justify-center items-center">

        <h1 className="lg:text-7xl text-6xl font-bold">
          u<span className="text-red-400 mt-3">URL</span>
        </h1>
        <p className="font-semibold lg:text-lg text-sm text-slate-600 text-center max-w-[500px]">Create short links. Share them anywhere. All inside the uURL Connections Platform.</p>
        <div className="flex justify-center gap-3 mt-5">
          <Link className="btn bg-red-400 hover:bg-red-700 text-white" href="/login">Get Started</Link>
          <Link className="btn text-slate-600 bg-white border-[1px]" href="/about">About</Link>
        </div>
      </div>
    </Layout>
  )
}
