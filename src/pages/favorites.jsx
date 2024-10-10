import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../assets/marvel-character.jpeg"; // Image par défaut si aucune image

function Favorites() {
  // État pour stocker les favoris
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav._id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <main>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="characters">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="character">
              <Link className="no-decoration" to={`/comics/${favorite._id}`}>
                <h3>{favorite.name}</h3>
                <img
                  src={
                    favorite.thumbnail && favorite.thumbnail.path !== ""
                      ? `${favorite.thumbnail.path}.${favorite.thumbnail.extension}`
                      : image
                  }
                  alt={favorite.name}
                />
              </Link>
              <button
                className="character-modal-bouton"
                onClick={() => removeFavorite(favorite._id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
