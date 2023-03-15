import Head from "next/head"
import { FC } from 'react'
import { Navbar } from "../ui";

interface Props {
    children: React.ReactNode;
    title?: string;
}

const origin = (typeof window === 'undefined') ? 'server' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {
    //console.log({origin})
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Daniel Carrasco" />
                <meta name="description" content={`Informacion sobre pokemon ${title}`} />
                <meta name="keywords" content={`${title},pokemon,pokedex`} />
                <meta property="og:title" content={`Información sobre ${title}`} />
                <meta property="og:description" content={`Esta es la página sobre ${title}`} />
                <meta property="og:image" content={`${origin}/images/mainImage.png`} />
            </Head>

            <Navbar />

            <main style={{
                padding: '0px 20px'

            }}>
                {children}
            </main>
        </>
    )
}
