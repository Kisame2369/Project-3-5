import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  useParams,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../API/Api"


export default function MovieDetailsPage() {
  const location = useLocation();
  const backlinkRef = useRef(location.state?.from ?? "/movies");

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    }

    getMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <Link to={backlinkRef.current}>Go back</Link>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width="250"
      />
            <h3>Additional Information</h3>

            <ul>
                <li>
                    <NavLink to="cast">Cast</NavLink>
                </li>
                <li>
                    <NavLink to="reviews">Reviews</NavLink>
                </li>
            </ul>

            <Outlet />
      
        </div>
    );
}