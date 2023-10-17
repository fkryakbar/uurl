import Head from "next/head";

export default function AuthLoading() {
    return (
        <>
            <Head>
                <title>Please wait</title>
            </Head>
            <div className="flex h-screen justify-center items-center">
                <span className="loading loading-ring loading-lg text-red-400"></span>
            </div>
        </>
    )
}