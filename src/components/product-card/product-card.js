import "./product-card.scss";
import { icnShipping, icnShipping2x } from "../../assets/images";
import { Link } from "react-router-dom";
import currencyFormat from "../../utils/currency-format";

function ProductCard({ productData }) {
  return (
    <div className="product">
      <div className="product--picture">
        <Link
          aria-labelledby={productData?.id}
          to={`/items/${productData?.id}`}
        >
          <img src={productData?.picture} alt="thumbnail product"></img>
        </Link>
      </div>
      <div className="product--info">
        <div className="product--info__extra">
          <div>
            <span className="product--info__price">
              <Link
                aria-labelledby={productData?.id}
                to={`/items/${productData?.id}`}
              >
                $ {currencyFormat(productData?.price)}
              </Link>
            </span>
            {productData?.free_shipping ? (
              <img
                srcSet={`${icnShipping} 1x, ${icnShipping2x} 2x`}
                alt="free shipping"
                className="product--info__price__shipping"
              ></img>
            ) : null}
          </div>

          <div className="product--info__title">
            <Link
              aria-labelledby={productData?.id}
              to={`/items/${productData?.id}`}
            >
              {productData?.title}
            </Link>
          </div>
        </div>
        <div className="product--info__city"> {productData?.location}</div>
      </div>
    </div>
  );
}

export default ProductCard;
