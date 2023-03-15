
const toggleFavorite = (id: number) => {
    //console.log('togglefavorite llamado')

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    if (favorites.includes(id)) {
        favorites = favorites.filter(pokeId => pokeId !== id)
    } else {
        favorites.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const existPokemonInFavorites = (id: number): boolean => {

    if (typeof window === 'undefined') return false //solo quiero comprobar esto en el lado del cliente

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    return favorites.includes(id)
}

const pokemons = (): number[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

export default {
    toggleFavorite,
    existPokemonInFavorites,
    pokemons,
}