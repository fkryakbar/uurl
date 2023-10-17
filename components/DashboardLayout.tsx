import Head from 'next/head';
import React, { ReactNode } from 'react';
import Gradient from './Gradient';


export default function Layout({ children, title }: { children: ReactNode, title: string }) {
    return <>
        <Head>
            <title>{title}</title>
        </Head>
        {children}
    </>
}