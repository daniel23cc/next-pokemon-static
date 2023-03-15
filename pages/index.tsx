import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { PokemonCard } from "@/components/pokemon";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { Grid, Image } from "@nextui-org/react";
import { GetStaticProps } from 'next'

interface Props {
  pokemons: SmallPokemon[];
}

export default function HomePage({ pokemons }: Props) {
  //console.log(pokemons)
  return (
    <Layout title="Listado de Pokemons">
      <Grid.Container gap={2} justify='center'>
        {
          pokemons.map((pokemon: SmallPokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  //console.log(data)

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}
