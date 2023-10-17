import Link from "next/link"
import { useEffect } from "react"
import UrlMenu from "./UrlMenu"

export default function UrlList({ getDataFunction, urlData, isLoadingData, setIsLoadingData }: { getDataFunction: any, urlData: any[], isLoadingData: boolean, setIsLoadingData: any }) {
    useEffect(() => {
        setIsLoadingData(true)
        getDataFunction()
    }, [])
    return (
        <>
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-3 mt-3">
                {
                    urlData.map((url, index) => {
                        return (
                            <div key={index} className="border-[1px] border-slate-200 rounded-lg p-4 truncate">
                                <Link href={`https://uurl.my.id/${url.back_half}`} target="_blank" className="flex flex-wrap gap-2 items-center hover:text-red-500 transition-all">
                                    <h1 className="font-bold text-slate-600 hover:text-red-500 transition-all">uurl.my.id/{url.back_half}</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </Link>
                                <p className="text-xs text-gray-500 font-semibold">
                                    To : {url.long_url}
                                </p>
                                <UrlMenu urlData={url} getDataFunction={getDataFunction} />
                            </div>
                        )
                    })
                }
            </div>
            {
                urlData.length == 0 && isLoadingData == false ? (<>
                    <div className="text-center">
                        No Data to display
                    </div>
                </>) : null
            }

            {
                isLoadingData ? (<>
                    <div className="text-center">
                        Loading...
                    </div>
                </>) : null
            }
        </>
    )
}