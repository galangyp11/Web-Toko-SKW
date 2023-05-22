import './banner.css'
import banner1 from '../image/Banner-1.png';
import banner2 from '../image/Banner-2.png';
import banner3 from '../image/Banner-3.png';

const Banner = () => {
    return ( 
        <div className="banner my-4 d-flex justify-content-center" style={{width:"100%"}}>
            <div id="carouselExampleIndicators" className="carousel-banner slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner img-carousel-banner">
                    <div className="carousel-item active">
                        <img src={banner1} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={banner2} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={banner3} className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
        </div>
     );
}
 
export default Banner;