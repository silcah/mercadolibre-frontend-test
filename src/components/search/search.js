import * as React from "react";
import "./search.scss";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "../../utils/query-provider";
import { logo, logo2x, icnSearch, icnSearch2x } from "../../assets/images";

function Search() {
  const [query, setQuery] = useQuery();
  const [queried, setQueried] = React.useState(false);
  const navigate = useNavigate();
  const inputQuery = React.createRef();

  React.useEffect(() => {
    if (!queried) {
      return;
    }
    navigate(`/items?search=${query}`);
  }, [query, queried]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQueried(true);
    setQuery(event.target.elements.search.value);
  }

  return (
    <div>
      <nav className="search">
        <Link to="/">
          <img
            srcSet={`${logo} 1x, ${logo2x} 2x`}
            alt="Logo Mercado Libre"
            className="logo"
            onClick={() => {
              setQuery("");
              setQueried(false);
              inputQuery.current.value = "";
            }}
          ></img>
        </Link>
        <div className="search-box">
          <form className="search-box--form" onSubmit={handleSearchSubmit}>
            <input
              placeholder="Nunca dejes de buscar"
              id="search"
              className="search-box--form--input"
              ref={inputQuery}
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
