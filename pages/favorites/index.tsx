import { Layout } from "@/components/layouts"
import { Favorites, NoFavorites } from "@/components/ui"
import localFavorites from "@/utils/localFavorites"
import { Card, Container, Grid, Image, Text } from "@nextui-org/react"
import { useEffect, useState } from "react"

const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
  }, [])


  return (
    <Layout title='Favoritos'>
      {
        favoritePokemons.length === 0
          ? <NoFavorites />
          : <Favorites favoritePokemons={favoritePokemons} />
      }

    </Layout>
  )
}

export default FavoritesPage