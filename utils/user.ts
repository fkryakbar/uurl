import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import FirebaseApp from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Firestore from "./firestore";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation"


const auth = getAuth(FirebaseApp);

export function useUser() {
    const [user, setUser] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = user as any
                const docRef = doc(Firestore, 'users', user.uid as string);
                const docSnap = await getDoc(docRef);

                const userName: any = docSnap.data()
                userData.displayName = userName.name;
                setUser(userData);
            } else {
                setUser(null)
            }
            setIsLoading(false)
        })
    }, [])

    return { user, isLoading }

}

export async function createUser(name: string, email: string, password: string): Promise<UserCreated> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(Firestore, "users", userCredential.user.uid), {
            name: name,
            email: email
        });
        return {
            status: 'success',
            data: {
                name: name,
                email: email,
            },
            error: null,
        }
    } catch (error: any) {
        return {
            status: 'error',
            error: error.code,
            data: null,
        }
    }

}


export async function signInUser(email: string, password: string): Promise<any> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            status: 'success',
            data: userCredential.user,
            error: null,
        }

    } catch (error: any) {
        return {
            status: 'error',
            error: {
                code: error.code,
                message: error.message,
            },
            data: null,
        }
    }

}

export async function signOutUser(): Promise<any> {
    try {
        const responses = await signOut(auth);
        return {
            status: 'success',
            data: responses,
            error: null,
        }
    } catch (error: any) {
        return { status: 'error', error: { code: error.code } }
    }
}