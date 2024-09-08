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
        {" "}
        <button onClick={() => setPage(page - 1)}>-</button>
        <p>{page}</p>
        <button onClick={() => setPage(page + 1)}>+</button>
      </div>
      <div className="comics">
        {data.map((comic) => {
          return (
            <div className="comic" key={comic._id}>
              <div onClick={() => openModal(comic)}>
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
              <button className="like">
                <svg
                  height="32"
                  width="32"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="empty"
                >
                  <path d="M0 0H24V24H0z" fill="none"></path>
                  <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  className="filled"
                >
                  <path fill="none" d="M0 0H24V24H0z"></path>
                  <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
                </svg>
              </button>
              {/* /* From Uiverse.io by LilaRest */}
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
