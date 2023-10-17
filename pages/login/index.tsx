import Layout from "@/components/FirstPageLayout";
import Toast from "@/utils/sweetallert";
import { createUser, signInUser, useUser } from "@/utils/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";




export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const user = useUser();
    if (user.isLoading == false && user.user) {
        window.location.href = '/dashboard';
    }
    async function doRegister(e: FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        if (formData.get('name') == '' || formData.get('email') == '' || formData.get('password') == '' || formData.get('confirmPassword') == '') {
            Toast.fire({
                icon: 'error',
                title: 'Please fill all fields'
            })
            setIsLoading(false)
            return false
        }
        const { status, data, error } = await signInUser(formData.get('email') as string, formData.get('password') as string);
        if (status == 'success') {
            Toast.fire({
                icon: 'success',
                title: 'Login Successfully'
            })


            setIsLoading(false)
            form.reset()
            return true
        }
        if (status == 'error') {
            Toast.fire({
                icon: 'error',
                title: error.code
            })
            setIsLoading(false)
            return false
        }
    }
    return (
        <Layout title="Login">
            <div className="h-screen flex justify-center items-center">
                <div className="lg:w-[350px] w-full mx-5 bg-white shadow-md rounded-lg p-5">
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-red-400">
                            uURL
                        </h1>
                    </Link>
                    <p className="mt-5 font-bold text-lg">Login</p>
                    <p className="mt-2  text-sm">To continue to <b>uURL</b></p>

                    <form action="" className="mt-5" onSubmit={doRegister}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Type your email" className="input input-bordered w-full max-w-xs" disabled={isLoading} />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Choose password" className="input input-bordered w-full max-w-xs" disabled={isLoading} />
                        </div>
                        <div className="form-control w-full max-w-xs mt-3">
                            <button type="submit" className="btn bg-red-500 text-white hover:bg-red-700" disabled={isLoading}>
                                {
                                    isLoading ? 'Please wait...' : 'Login'
                                }
                            </button>
                        </div>
                    </form>
                    <p className="my-3 text-center text-sm">Don&apos;t have any account? Click <Link className="text-red-400" href="/register">Here</Link> to register</p>
                </div>
            </div>
        </Layout>
    )
}