import Firestore from '@/utils/firestore'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getServerSideProps = (async (context) => {
    const docRef = doc(Firestore, "url", context.query.backhalf as string);
    const docSnap = await getDoc(docRef);
    let urlDataFromServer = {}
    if (docSnap.exists()) {
        const urlData = docSnap.data()
        await updateDoc(docRef, {
            total_clicks: increment(1)
        })
        let destination = urlData.long_url;
        if (!destination.startsWith("http://") || !destination.startsWith("https://")) {
            destination = "http://" + destination;
        }
        return {
            redirect: {
                destination: destination,
                permanent: false,
            },
        }
    }
    return { props: { urlDataFromServer } }
}) satisfies GetServerSideProps<{

}>


export default function Page({ urlDataFromServer }: { urlDataFromServer: any }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)
    const router = useRouter()

    const loadUrl = async () => {
        setIsLoading(true)
        if (router.isReady) {
            const docRef = doc(Firestore, "url", router.query.backhalf as string);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setIsAvailable(true)
                const urlData = docSnap.data()
                await updateDoc(docRef, {
                    total_clicks: increment(1)
                })
                // window.location.href = `//${urlData.long_url}`
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        loadUrl()
    }, [router.isReady])

    return <>
        <Head>
            <title>An Shortener Link | uURL</title>
        </Head>
        {
            isLoading ? (<>
                <div className="h-screen flex justify-center items-center">
                    <span className="loading loading-ring loading-lg text-red-400"></span>
                </div>
            </>) : null
        }
        {
            isLoading == false && isAvailable == false ? (
                <div className="h-screen flex justify-center items-center">
                    <div className='flex flex-col items-center'>
                        <Image src="/404 Error-pana.svg" alt="" className='lg:w-[80%] w-[60%]' width={200} height={200} />
                        <p>
                            <span className="text-gray-600 font-bold">Your Requested URL Cannot be found</span>
                        </p>
                    </div>

                </div>
            ) : null
        }
    </>
}