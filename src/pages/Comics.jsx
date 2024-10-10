import axios from "axios";
import { useEffect, useState } from "react";
import image from "../assets/marvel-character.jpeg";
import loading from "../assets/loading.gif";
import Modal from "../components/Modal/Modal";

const ComicsModal = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComic, setSelectedComic] = useState(null);
  const [page, setPage] = useState(0);

  //Modal
  const openModal = (element) => {
    setSelectedComic(element);
    // console.log(openModal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComic(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--dnxhn8mdblq5.code.run/comics?title=${search}&page=${page}`
        );
        console.log("Données de l'API :", response.data);

        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, page]);

  return isLoading ? (
    <div className="loading">
      <h1>...LOADING</h1>
      <img className="loading" src={loading} alt="Loading" />
    </div>
  ) : (
    <main>
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
        <p>{page}</p>
        <button onClick={() => setPage(page + 1)}>+</button>
      </div>
      <div className="comics">
        {data.map((comic) => {
          return (
            <div
              className="comic"
              key={comic._id}
              onClick={() => openModal(comic)}
            >
              <h3>{comic.title}</h3>
              <img
                src={
                  comic.thumbnail.path ===
                  "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                    ? image
                    : `${comic.thumbnail.path}.${comic.thumbnail.extension}`
                }
                alt="Characters Marvel"
              />
            </div>
          );
        })}
      </div>
      ;
      <Modal element={selectedComic} onClose={closeModal} />
    </main>
  );
};
export default ComicsModal;
