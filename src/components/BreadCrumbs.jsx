import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./breadcrumbs.css";

const BreadCrumbs = () => {
  const routes = [
    { path: "/", breadcrumb: "Beranda" },
    { path: "/item/:id", breadcrumb: "Item" },
  ];

  const breadCrumbs = useBreadcrumbs(routes);
  const location = useLocation();

  return (
    <span className="bread-crumbs">
      {breadCrumbs.map(({ match, breadcrumb }) => {
        <Link
          key={match.url}
          to={match.url}
          className={
            match.pathname === location.pathname
              ? "breadcrumb-active"
              : "breadcrumb-not-active"
          }
        >
          {breadcrumb.props.children} /
          {console.log({ match, breadcrumb, location })}
        </Link>;
      })}
    </span>
  );
};

export default BreadCrumbs;
