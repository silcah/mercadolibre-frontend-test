import * as React from "react";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import ProductCard from "../../components/product-card/product-card";
import "./result-search.scss";
import { useAsync } from "../../utils/hooks";
import { client } from "../../utils/api-client";
import { useQuery } from "../../utils/query-provider";
import { useSearchParams } from "react-router-dom";

function ResultSearch() {
  const { data, error, run, isError, isSuccess } = useAsync();
  const [query, setQuery] = useQuery();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    run(client(`api/items?q=${query}`));
  }, [query, run]);

  React.useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setQuery(search);
    }
  }, [searchParams]);

  return (
    <>
      {isError ? (
        <div>
          <p>Se produjo un error: </p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.items?.length ? (
          <div className="result">
            <BreadCrumb categories={data.categories} />
            <div className="product-list">
              {data.items.map((item) => (
                <div key={item.id} className="product">
                  <ProductCard productData={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No se encontraron productos.</p>
        )
      ) : null}
    </>
  );
}

export default ResultSearch;
