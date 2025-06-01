
import { useEffect, useState } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';
import { fetchTrendingMovies } from '../../API/Api';

export default function HomePage() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadTrending = async () => {
          try {
            const data = await fetchTrendingMovies();
            setMovies(data);
          } catch (err) {
            console.error("Failed to fetch trending movies:", err);
          }
        };
        loadTrending();
      }, []);
  
    return (
        <div>
            <h1>Trending today</h1>
            {movies.length > 0 && <MoviesList movies={movies} />}
        </div>
    );
  }