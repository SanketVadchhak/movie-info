import '../css/MovieCard.css'
import { useState } from 'react'
import { useMovieContext } from '../contexts/MovieContext'

function MovieCard({movie}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

    function onFavoriteClick() {
        if (isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    // Format the release date to show month and year
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    // Calculate rating percentage for the circular progress
    const ratingPercentage = (movie.vote_average / 10) * 100;

    return (
        <div className="movie-card">
           <div className="movie-poster">
           <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
           </div>
           <div className="movie-overlay">
            <button 
                className={`favorite-button ${isFavorite(movie.id) ? 'active' : ''}`} 
                onClick={onFavoriteClick}
            >
                ❤
            </button>
           </div>
           <div className="movie-info">
            <h3>{movie.title}</h3>
            <div className="info-row">
                <p className="release-date">{formatDate(movie.release_date)}</p>
                <div className="rating-circle">
                    <div className="rating-progress" style={{ '--rating': `${ratingPercentage}%` }}>
                        <span className="rating-value">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                </div>
            </div>
            <div className={`description ${isExpanded ? 'expanded' : ''}`}>
                <p>{movie.overview}</p>
                <button 
                    className="expand-button" 
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </button>
            </div>
           </div>
        </div>
    )
}

export default MovieCard;