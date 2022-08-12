import Head from 'next/head'
import React, { FC, useEffect } from 'react'
import Image from 'next/image';
import { Box } from '@mui/system';
import { Footer } from '../Footer';

interface Props {
    children: React.ReactNode
    title: string
}

export const Layout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
                <div data-aos="zoom-in-left">
            <Box display='flex' justifyContent='center' sx={{ mt: 4 }}>
                    <Image src='/logo.png' width={200} height={200} alt='logo' />
            </Box>
                </div>
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

