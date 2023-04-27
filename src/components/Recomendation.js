import './recomendation.css'
import Makanan from './image/makanan.jpg';
import Minuman from './image/minuman.jpg';
import Jasa from './image/jasa.png';
import Kerajinan from './image/kerajinan.jpg';
import Aksesoris from './image/aksesoris.jpg';
import Pakaian from './image/kaos.jpg'

const Recomendation = () => {
    return ( 
        <div className="recomendation d-flex justify-content-center align-items-center">
            <div className="item-recomend mx-4 d-flex justify-content-center align-items-center">
                <div className="recomend-thumbnail ">
                    <h2 className='text-thumbnail'>Makanan</h2>
                    <img className='img-thumbnail' src={Makanan} alt="">
                        
                    </img>
                </div>
            </div>

            <div className="item-recomend mx-4 d-flex justify-content-center align-items-center">
                <div className="recomend-thumbnail ">
                    <h2 className='text-thumbnail'>Minuman</h2>
                    <img className='img-thumbnail' src={Minuman} alt="" />
                </div>
            </div>

            <div className="item-recomend mx-4 d-flex justify-content-center align-items-center">
                <div className="recomend-thumbnail ">
                    <h2 className='text-thumbnail'>Jasa</h2>
                    <img className='img-thumbnail' src={Jasa} alt="" />
                </div>
            </div>

            {/* <div className="item-recomend">
                <div className="recomend-thumbnail">
                    <img className='img-thumbnail' src={Kerajinan} alt="" />
                </div>
            </div>

            <div className="item-recomend">
                <div className="recomend-thumbnail">
                    <img className='img-thumbnail' src={Aksesoris} alt="" />
                </div>
            </div>

            <div className="item-recomend">
                <div className="recomend-thumbnail">
                    <img className='img-thumbnail' src={Pakaian} alt="" />
                </div>
            </div> */}
        </div>
     );
}
 
export default Recomendation;