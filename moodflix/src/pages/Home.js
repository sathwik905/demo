import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaInfoCircle, FaStar } from "react-icons/fa";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchMovies = async (pageNumber = 1) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/movies?page=${pageNumber}`);

      if (pageNumber === 1) {
        setMovies(res.data.results || []);
      } else {
        const newMovies = res.data.results || [];
        setMovies((prev) => {
          const merged = [...prev, ...newMovies];
          const unique = merged.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          );
          return unique;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchMovies = async () => {
    try {
      if (!search.trim()) {
        setPage(1);
        fetchMovies(1);
        return;
      }

      const res = await axios.get(`http://localhost:8080/api/search?query=${search}`);
      setMovies(res.data.results || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="logo">SNEWIFY</div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search any movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchMovies();
            }}
          />
          <button onClick={searchMovies}>Search</button>
        </div>
      </div>

      <motion.div
        className="hero"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>Feel the story. Find your movie.</h1>
          <p>
            Explore trending films, search your favorites, and enjoy a premium
            cinematic experience with rich details, cast info, and animations.
          </p>

          <div className="hero-buttons">
            <button className="hero-btn">
              <FaPlay style={{ marginRight: "8px" }} />
              Play Now
            </button>

            <button className="hero-btn-outline">
              <FaInfoCircle style={{ marginRight: "8px" }} />
              More Info
            </button>
          </div>
        </div>
      </motion.div>

      <h2 className="section-title">Trending Now</h2>

      <div className="movies-grid">
        {movies.map((movie, index) => (
          <motion.div
            className="movie-card"
            key={movie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="movie-overlay">
              <div>
                <h3>{movie.title}</h3>
                <p>
                  <FaStar style={{ color: "#ffd54f", marginRight: "6px" }} />
                  {movie.vote_average}
                </p>
              </div>
            </div>

            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="center-btn">
        <button className="load-btn" onClick={loadMore}>
          Load More
        </button>
      </div>
    </>
  );
}

export default Home;