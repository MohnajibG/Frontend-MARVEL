import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/marvel-character.jpeg";
import loading from "../assets/loading.gif";
import Modal from "../components/Modal/Modal";

const Characters = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const openModal = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://site--backend-marvel--dnxhn8mdblq5.code.run/characters?name=${search}`
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <div className="loading">
      {" "}
      <h1>...LOADING</h1>
      <img className="loading" src={loading} alt="Loading" />
    </div>
  ) : (
    <main>
      <div className="characters">
        {data.map((personnage) => (
          <div className="character" key={personnage.id}>
            <Link className="no-decoration" to={`/comics/${personnage._id}`}>
              <h3>{personnage.name}:</h3>

              <img
                src={
                  personnage.thumbnail.path ===
                  "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                    ? image
                    : `${personnage.thumbnail.path}.${personnage.thumbnail.extension}`
                }
                alt="Characters Marvel"
              />
            </Link>
            <button
              className="character-modal-bouton"
              onClick={() => openModal(personnage)}
            >
              informations...
            </button>
          </div>
        ))}
      </div>
      <Modal element={selectedCharacter} onClose={closeModal} />
    </main>
  );
};
export default Characters;
