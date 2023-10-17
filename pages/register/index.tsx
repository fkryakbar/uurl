import Layout from "@/components/FirstPageLayout";
import Toast from "@/utils/sweetallert";
import { createUser } from "@/utils/user";
import Link from "next/link";
import { FormEvent, useState } from "react";




export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
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

        if (formData.get('password') != formData.get('confirm_password')) {
            Toast.fire({
                icon: 'error',
                title: 'Password confirmation does not match'
            })
            setIsLoading(false)
            return false
        }
        if (formData.get('name') !== null && formData.get('email') !== null && formData.get('password') !== null) {
            const { status, data, error } = await createUser(formData.get('name') as string, formData.get('email') as string, formData.get('password') as string);
            if (status == 'success') {
                Toast.fire({
                    icon: 'success',
                    title: 'Account Registered'
                })
                setIsLoading(false)
                form.reset()
                return true
            }
            if (status == 'error') {
                Toast.fire({
                    icon: 'error',
                    title: error
                })
                setIsLoading(false)
                return false
            }
        }
    }
    return (
        <Layout title="Registration">
            <div className="h-screen flex justify-center items-center">
                <div className="lg:w-[350px] w-full mx-5 bg-white shadow-md rounded-lg p-5">
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-red-400">
                            uURL
                        </h1>
                    </Link>
                    <p className="mt-5 font-bold text-lg">Register</p>
                    <p className="mt-2  text-sm">To continue to <b>uURL</b></p>

                    <form action="" className="mt-5" onSubmit={doRegister}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Your name</span>
                            </label>
                            <input type="text" name="name" placeholder="Type your name" className="input input-bordered w-full max-w-xs" disabled={isLoading} />
                        </div>
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
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name="confirm_password" placeholder="Retype password" className="input input-bordered w-full max-w-xs" disabled={isLoading} />
                        </div>
                        <div className="form-control w-full max-w-xs mt-3">
                            <button type="submit" className="btn bg-red-500 text-white hover:bg-red-700" disabled={isLoading}>
                                {
                                    isLoading ? 'Please wait...' : 'Register'
                                }
                            </button>
                        </div>
                    </form>
                    <p className="my-3 text-center text-sm">Already Registered? Click <Link className="text-red-400" href="/login">Here</Link> to login</p>
                </div>
            </div>
        </Layout>
    )
}