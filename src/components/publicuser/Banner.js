import "./banner.css";
import banner1 from "../image/Banner-1.png";
import banner2 from "../image/School-Fundraising1.png";
import banner3 from "../image/School-Fundraising2.png";

const Banner = () => {
  return (
    <div className="banner d-flex justify-content-center">
      <div
        id="carouselExample"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            className="active indicator"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className="indicator"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className="indicator"
          ></button>
        </div>
        <div className="carousel-inner img-carousel-banner">
          <div className="carousel-item active">
            <img src={banner1} className="d-block w-100 banner-img" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={banner2} className="d-block w-100 banner-img" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={banner3} className="d-block w-100 banner-img" alt="..." />
          </div>
        </div>
        {/* <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button> */}
      </div>
    </div>
  );
};

export default Banner;
