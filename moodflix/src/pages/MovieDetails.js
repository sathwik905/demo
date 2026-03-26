import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/movie/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8080/api/movie/${id}/credits`)
      .then((res) => setCredits(res.data.cast ? res.data.cast.slice(0, 8) : []))
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) {
    return <h2 style={{ color: "white", padding: "30px" }}>Loading...</h2>;
  }

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>

      <div style={{ height: "20px" }}></div>

      <div className="details-container">
        <motion.img
          className="details-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          initial={{ rotateY: 90, opacity: 0, scale: 0.85 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          className="details-content"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1>{movie.title}</h1>
          <div className="glow-line"></div>

          <div className="meta-row">
            <span>⭐ {movie.vote_average}</span>
            <span>📅 {movie.release_date}</span>
            <span>🎭 {movie.genres?.map((g) => g.name).join(", ")}</span>
          </div>

          <p>{movie.overview}</p>
        </motion.div>
      </div>

      <h2 className="section-title">Top Cast</h2>

      <div className="cast-grid">
        {credits.map((person, index) => (
          <motion.div
            className="cast-card"
            key={person.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : "https://via.placeholder.com/300x400?text=No+Image"
              }
              alt={person.name}
            />
            <div>
              <h4>{person.name}</h4>
              <p>{person.character}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;