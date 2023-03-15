import React from 'react';
import { Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"
import NextLink from 'next/link'

export const Navbar = () => {

    const { theme } = useTheme()

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            backgroundColor: theme?.colors.gray800.value,
        }}>
            <NextLink href="/" passHref>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className="col animate__animated animate__fadeInLeft">
                    <Image
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png"
                        alt="Icono de la app"
                        width={70}
                        height={70}
                    />
                    <Image
                        src="/images/mainLogo.png"
                        alt="Logo"
                        width={163}
                        height={50}
                    />
                    {/* <Text color="white" h2>P</Text>
                    <Text color="white" h3>okémon</Text> */}
                    <Spacer css={{ flex: 1 }} />
                </div>
            </NextLink>
            <NextLink href="/favorites" passHref>
                <div className="col animate__animated animate__fadeInRight">
                    {/* <Text color="white">Favoritos</Text> */}
                    <Image
                        src="/images/favoritesLogo.png"
                        alt="Logo"
                        width={75}
                        height={20}
                    />
                </div>
            </NextLink>
        </div>
    )
}
