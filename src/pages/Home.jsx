import axios from "axios";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import loading from "../assets/loading.gif";
import heroVideo from "../assets/Marvel Opening Theme.mp4";
import heroImage from "../assets/hero.webp";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-marvel--dnxhn8mdblq5.code.run/characters/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loading">
      <h1>...LOADING</h1>
      <img className="loading" src={loading} alt="Loading" />
    </div>
  ) : (
    <main>
      <div className="hero">
        <video src={heroVideo} controls width="500" height="300" autoPlay loop>
          Texte
        </video>
        <img src={heroImage} alt="" />
      </div>
      {/* <div className="characters">
        {data.results.map((personnage, _id) => (
          <Link to={`/comics/${personnage._id}`}>
            <div className="character" key={personnage._id}>
              <div>
                <h3>{personnage.name}</h3>

                <img
                  src={
                    personnage.thumbnail &&
                    personnage.thumbnail.path ===
                      "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                      ? "./src/assets/marvel-character.jpeg"
                      : `${personnage.thumbnail.path}.${personnage.thumbnail.extension}`
                  }
                  alt="Characters Marvel"
                />
              </div>
              <p>{personnage.description || "Aucune description disponible"}</p>
            </div>
          </Link>
        ))}
      </div> */}
    </main>
  );
};
export default Home;
