import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AppHeader from "./components/AppHeader/AppHeader";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";


const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
//const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));


export default function App() {
  return (
    <>
      <AppHeader />

      <Suspense fallback={<strong>Loading...</strong>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          
        </Routes>
      </Suspense>
    </>
  );
}
