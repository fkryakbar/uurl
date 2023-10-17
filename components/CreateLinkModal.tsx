import { FormEvent, useState } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore";
import Firestore from "@/utils/firestore";
import Toast from "@/utils/sweetallert";

export default function CreateLinkModal({ user, getDataFunction }: { user: any, getDataFunction: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const [backHalf, setBackHalf] = useState('');
    async function formSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formElement = e.currentTarget
        const formData = new FormData(formElement);
        setIsLoading(true);

        if (formData.get('long_url') == '' || backHalf == '') {
            Toast.fire({
                icon: 'error',
                title: 'Please fill all fields'
            })
            setIsLoading(false)
            return false
        }

        const docRef = doc(Firestore, "url", backHalf);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            Toast.fire({
                icon: 'error',
                title: 'This back half already exists'
            })
            setIsLoading(false)
            return false
        } else {
            await setDoc(doc(Firestore, "url", backHalf), {
                user_email: user.email,
                long_url: formData.get("long_url") as string,
                total_clicks: 0,
                back_half: backHalf
            })
            Toast.fire({
                icon: 'success',
                title: 'Link created successfully'
            })
            getDataFunction();
        }


        formElement.reset()
        setIsLoading(false);
    }
    return <>
        <dialog id="create" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Shorten a long link</h3>
                <form action="" onSubmit={formSubmit}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Paste a long link</span>
                        </label>
                        <input type="text" name="long_url" placeholder="Example: https://super-long-link.com/shorten-it" className="input input-bordered w-full" disabled={isLoading} />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Enter a back half</span>
                        </label>
                        <div className="join">
                            <div className="join-item bg-slate-200 p-2 font-semibold flex items-center text-slate-500">uurl.my.id/</div>
                            <input type="text" onChange={e => {
                                setBackHalf(e.target.value.replace(/\s+/g, '-'));
                            }} placeholder="Example: favorite-link" className="input input-bordered w-full join-item" name="back_half" disabled={isLoading} />
                        </div>
                        {
                            backHalf != '' ? (
                                <div className="mt-2 font-bold">
                                    Your Link will be : https://uurl.my.id/{backHalf}
                                </div>
                            ) : null
                        }
                    </div>
                    <button type="submit" className="btn mt-3 bg-red-400 hover:bg-red-700 text-white border-0" disabled={isLoading}>
                        {isLoading ? 'Loading' : 'Get the link'}
                    </button>
                </form>
            </div>
        </dialog>
    </>
}