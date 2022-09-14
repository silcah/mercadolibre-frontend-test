import "./breadcrumb.scss";
function BreadCrumb({ categories }) {
  return (
    <div className="breadcrumb">
      {categories?.map((item, index) => (
        <span key={item} className="breadcrumb__item">
          {item} {index < categories.length - 1 ? "  >  " : ``}
        </span>
      ))}
    </div>
  );
}

export default BreadCrumb;
