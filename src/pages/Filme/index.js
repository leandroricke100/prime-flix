import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme-info.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "6928a233caa496ec7526dfc6ea0b3f71",
            language: "pt-BR",
          },
        })
        .then((response) => {
          console.log(response);
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Não foi possível encontrar o Filme");
          navigate("/", { replace: true }); //redirecionar a pagina de home
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("componente foi desmontado");
    };
  }, [navigate, id]);

  function salvarFilmes() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Filme já esta na sua lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  function formatarData(data) {
    const partesData = data.split("-");
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2];
    return `${dia}-${mes}-${ano}`;
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <i>
        <strong>Lançamento:</strong> {formatarData(filme.release_date)}
      </i>

      <span>{filme.overview}</span>
      <strong>
        Avaliação: {parseFloat(filme.vote_average).toFixed(1)} /10
      </strong>

      <div className="area-buttons">
        <button onClick={salvarFilmes}>Salvar</button>
        <button>
          <a
            target="blank"
            href={`https://youtube.com/results?search_query=${filme.title} trailer`}
            rel="external"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
export default Filme;
