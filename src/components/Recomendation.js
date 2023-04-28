import './recomendation.css'
import Makanan from './image/makanan.jpg';
import Minuman from './image/minuman.jpg';
import Jasa from './image/jasa.png';
import Kerajinan from './image/kerajinan.jpg';
import Aksesoris from './image/aksesoris.jpg';
import Pakaian from './image/kaos.jpg'

const Recomendation = () => {
    return ( 
        <div className="recomendation d-flex justify-content-center">
            <div className="row d-flex justify-content-center align-items-center" style={{ width:"60dvw"}}>
                <div className="item-recomend m-4">
                    <div className="row">
                        <div className="recomend-thumbnail ">
                            <img className='img-thumbnail' src={Makanan} alt=""/>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className='text-thumbnail text-center'>Makanan</h2>
                    </div>
                </div>

                <div className="item-recomend m-4">
                    <div className="row">
                        <div className="recomend-thumbnail ">
                            <img className='img-thumbnail' src={Minuman} alt=""/>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className='text-thumbnail text-center'>Minuman</h2>
                    </div>
                </div>

                <div className="item-recomend m-4">
                    <div className="row">
                        <div className="recomend-thumbnail ">
                            <img className='img-thumbnail' src={Jasa} alt=""/>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className='text-thumbnail text-center'>Jasa</h2>
                    </div>
                </div>

                <div className="item-recomend m-4">
                    <div className="row">
                        <div className="recomend-thumbnail ">
                            <img className='img-thumbnail' src={Kerajinan} alt=""/>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className='text-thumbnail text-center'>Kerajinan</h2>
                    </div>
                </div>

                <div className="item-recomend m-4">
                    <div className="row">
                        <div className="recomend-thumbnail ">
                            <img className='img-thumbnail' src={Aksesoris} alt=""/>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className='text-thumbnail text-center'>Aksesoris</h2>
                    </div>
                </div>

                <div className="item-recomend m-4">
                    <div className="row">
                        <div className="recomend-thumbnail ">
                            <img className='img-thumbnail' src={Pakaian} alt=""/>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className='text-thumbnail text-center'>Pakaian</h2>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Recomendation;