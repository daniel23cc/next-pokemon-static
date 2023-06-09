import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts'
import { Pokemon, PokemonListResponse } from '@/interfaces';
import localFavorites from '@/utils/localFavorites';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { getPokemonInfo } from '@/utils';


interface Props {
    //pokemon: any;
    /* id: string;
    name: string; */
    pokemon: Pokemon
}


const PokemonPage: NextPage<Props> = ({ pokemon }) => {


    const [isInFavorites, setIsInFavorites] = useState(false)

    useEffect(() => {
        setIsInFavorites(localFavorites.existPokemonInFavorites(pokemon.id))
    }, [pokemon.id])

    const onToggleFavourite = () => {
        //console.log('ID',pokemon.id)
        //localStorage.setItem('favorites',`${pokemon.id}`)
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)

        if (isInFavorites) return;
        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })
    }

    //console.log({existeWindow: typeof window}


    //const router = useRouter()

    return (
        <Layout title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                                alt={pokemon.name}
                                width='100%'
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button
                                color='gradient'
                                ghost={!isInFavorites}
                                onClick={onToggleFavourite}
                            >
                                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>

                            <Container direction='row' display='flex'>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>

                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export default PokemonPage

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    //console.log({ctx})

    const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`)

    return {
        paths: pokemons151.map(id => ({
            params: { id }
        })),
        //fallback: false //al solicitar un id no especificado muestra 404
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    //console.log({params})

    const { id } = params as { id: string }

    const pokemon = await getPokemonInfo(id)

    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    /* const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`) */
    /*     const pokemon = {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
        } */

    return {
        props: {
            pokemon
        },
        revalidate: 86400
    }
}

