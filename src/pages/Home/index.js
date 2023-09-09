import { useState, useEffect } from "react";
import api from "../../services/api";

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/popular", {
        params: {
          api_key: "6928a233caa496ec7526dfc6ea0b3f71",
          language: "pt-BR",
          page: 1,
        },
      });
      console.log(response.data.results);
    }

    loadFilmes();
  }, []);

  return (
    <div>
      <h1>Bem vindo a home</h1>
    </div>
  );
}
export default Home;
