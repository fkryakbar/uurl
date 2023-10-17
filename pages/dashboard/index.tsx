import AuthLoading from "@/components/AuthLoading";
import CreateLinkModal from "@/components/CreateLinkModal";
import Layout from "@/components/DashboardLayout";
import UrlList from "@/components/UrlList";
import Firestore from "@/utils/firestore";
import Toast from "@/utils/sweetallert";
import { signOutUser, useUser } from '@/utils/user';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";


async function signOut() {
    const logout = await signOutUser();
    if (logout.status == 'success') {
        Toast.fire({
            icon: 'success',
            title: 'Logout Successfully'
        })
    } else {
        Toast.fire({
            icon: 'error',
            title: logout.error.message
        })
    }
}

export default function Dashboard() {
    const { user, isLoading } = useUser();
    const [urlData, setUrlData] = useState<any[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    if (isLoading) return <AuthLoading />


    if (!user) return window.location.href = '/login';


    const getData = async () => {
        const data: any[] = [];
        const q = query(collection(Firestore, 'url'), where('user_email', '==', user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(snapshot => {
            data.push(snapshot.data());
        })
        setUrlData(data);
        setIsLoadingData(false)
    }

    return (<Layout title="Dashboard">
        <div className="mt-10 lg:w-[80%] mx-auto w-[95%]">
            <h1 className="text-5xl font-bold">
                u<span className="text-red-400">URL</span>
            </h1>
            <div className="mt-3 flex justify-between flex-wrap gap-3 items-center">
                <h1 className="font-semibold text-slate-600 text-xl">Welcome, {user.displayName}</h1>
                <button onClick={signOut} className="btn btn-sm bg-red-600 border-0 hover:bg-red-800 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </button>
            </div>
            <div className="border-[1px] border-slate-200 rounded-lg p-4 mt-5">
                <div className="flex justify-end ">
                    <button onClick={e => {
                        const modal: any = document.getElementById('create');
                        if (modal) {
                            modal.showModal();
                        }
                    }} className="btn bg-red-400 border-0 hover:bg-red-800 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Create</button>
                </div>
                <UrlList getDataFunction={getData} urlData={urlData} isLoadingData={isLoadingData} setIsLoadingData={setIsLoadingData} />
            </div>
        </div>
        <CreateLinkModal user={user} getDataFunction={getData} />

    </Layout>)
}