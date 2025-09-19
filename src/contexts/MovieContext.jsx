import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState(() => {
        // Initialize state from localStorage
        const storedFavs = localStorage.getItem("favorites")
        return storedFavs ? JSON.parse(storedFavs) : []
    })

    useEffect(() => {
        // Save to localStorage whenever favorites change
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        // Check if movie is already in favorites
        if (!favorites.some(fav => fav.id === movie.id)) {
            setFavorites(prev => [...prev, movie])
        }
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}