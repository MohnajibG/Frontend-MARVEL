import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

const Character = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--dnxhn8mdblq5.code.run/comics/${characterId}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main>
      <div className="characters">
        {data.comics.map((comic) => {
          return (
            <div key={comic.id}>
              <h3>{comic.title}</h3>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt="Characters Marvel"
              />
            </div>
          );
        })}
      </div>
    </main>
  );
};
export default Character;
