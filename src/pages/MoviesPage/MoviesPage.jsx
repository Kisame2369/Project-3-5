import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import MoviesList from "../../components/MoviesList/MoviesList";
import { searchMovies } from "../../API/Api";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [debouncedQuery] = useDebounce(query, 200);

  const changeSearchQuery = (event) => {
    const newQuery = event.target.value;
    const nextSearchParams = new URLSearchParams(searchParams);

    if (newQuery !== "") {
      nextSearchParams.set("query", newQuery);
    } else {
      nextSearchParams.delete("query");
    }

    setSearchParams(nextSearchParams);
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) return setMovies([]);
    searchMovies(debouncedQuery).then(setMovies).catch(() => setMovies([]));
  }, [debouncedQuery]);

  return (
    <>
      <input type="text" value={query} onChange={changeSearchQuery} />
      {movies.length > 0 && <MoviesList movies={movies} />}
    </>
  );
}