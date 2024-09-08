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
  const [page, setPage] = useState(0);

  const openModal = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };
  // const handleChangePage = (direction) => {
  //   if (direction === "prev" && page > 1) {
  //     setPage(page - 1);
  //   } else if (direction === "next") {
  //     setPage(page + 1);
  //   }
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--dnxhn8mdblq5.code.run/character?name=${search}&page=${page}`
        );
        console.log(response.data);
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
          <div className="character" key={personnage._id}>
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
      <div
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <button onClick={() => setPage(page - 1)}>-</button>
        {Array.from({ length: nbPage }, (_, i) => i + 1).map((page) => {
          return <button>1</button>;
        })}
        <button onClick={() => setPage(page + 1)}>+</button>
      </div>
      ;
      <Modal element={selectedCharacter} onClose={closeModal} />
    </main>
  );
};
export default Characters;
