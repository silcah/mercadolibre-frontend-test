import * as React from "react";
import { useAsync } from "../../utils/hooks";
import { client } from "../../utils/api-client";
import { useParams } from "react-router-dom";
import currencyFormat from "../../utils/currency-format";

import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import "./detail-page.scss";

function DetailPage() {
  const { id: productId } = useParams();
  const { data, error, run, isError, isSuccess } = useAsync();

  React.useEffect(() => {
    run(client(`api/items/${productId}`));
  }, [run, productId]);

  return (
    <>
      {isError ? (
        <div>
          <p>Se produjo un error: </p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        <div className="detail-section">
          <BreadCrumb categories={data?.item?.categories} />
          <div className="detail">
            <div className="detail__information">
              <div className="detail__image">
                <img src={data?.item?.picture} alt="Product" />
              </div>
              {data?.item?.description ? (
                <div className="detail__description">
                  <div className="detail__description__title">
                    Descripción del producto
                  </div>
                  <div className="detail__description__text">
                    {data?.item?.description}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="detail__buy-info">
              <div className="detail__buy-info--condition-sold">
                {data?.item?.condition === "new" ? "Nuevo" : "Usado"} -{" "}
                {data?.item?.sold_quantity} vendidos
              </div>
              <div className="detail__buy-info--title">
                {" "}
                {data?.item?.title}{" "}
              </div>
              <div className="detail__buy-info--price">
                $ {currencyFormat(data?.item?.price)}
              </div>
              <button className="detail__buy-info--button">Comprar</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DetailPage;
