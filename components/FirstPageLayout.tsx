import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';
import React, { ReactNode } from 'react';
import Gradient from './Gradient';


export default function Layout({ children, title }: { children: ReactNode, title: string }) {
    return <>
        <Head>
            <title>{title}</title>
        </Head>
        <Gradient />
        {children}
    </>
}