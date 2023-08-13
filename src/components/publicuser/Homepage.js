import "./homepage.css";

import Items from "./Items";
import Category from "./Category";
import Banner from "./Banner";
import Loading from "../Loading";

const Homepage = () => {
  return (
    <div className="homepage-con container">
      <div className="row d-flex justify-content-center">
        <Banner />
      </div>

      <div className="row d-flex justify-content-center">
        <Category />
      </div>

      <div className="row d-flex justify-content-center">
        <Items />
      </div>
    </div>
  );
};

export default Homepage;
