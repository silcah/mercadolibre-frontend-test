import * as React from "react";
import "./search.scss";
import { useNavigate, Link } from "react-router-dom";
import { logo, logo2x, icnSearch, icnSearch2x } from "../../assets/images";
import { useQuery } from "../../utils/query-provider";

function Search() {
  const [query, setQuery] = useQuery();
  const [queried, setQueried] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!queried) {
      return;
    }
    navigate(`/items?search=${query}`);
  }, [query, queried]);

  function handleSearchSubmit(event) {
    const inputQuery = event.target.elements.search.value;
    event.preventDefault();
    setQueried(true);
    setQuery(inputQuery);
  }

  return (
    <div>
      <nav className="search">
        <Link to="/">
          <img
            srcSet={`${logo} 1x, ${logo2x} 2x`}
            alt="Logo Mercado Libre"
            className="logo"
          ></img>
        </Link>
        <div className="search-box">
          <form className="search-box--form" onSubmit={handleSearchSubmit}>
            <input
              placeholder="Nunca dejes de buscar"
              id="search"
              className="search-box--form--input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button type="submit" className="search-box--form--button">
              <img
                srcSet={`${icnSearch} 1x, ${icnSearch2x} 2x`}
                alt="Buscar"
              ></img>
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Search;
