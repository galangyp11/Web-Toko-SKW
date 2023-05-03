import './homepage.css'
import Items from './Items';
import Category from './Category';
import Navbar from './Navbar';
import Footer from './Footer';

const Homepage = () => {
    
    return ( 
        <div className="homepage">
            <div className="sticky-top">
                <Navbar/>
            </div>
            <div className="homepage-con container">
                <div className='row'>
                    <div className="col">
                    <Category/>
                    </div> 
                </div>

                <div className="row">
                    <div className="col">
                        <Items/>    
                    </div>
                </div>

            </div>
            <div className="">   
                <Footer/>       
            </div>
        </div>
     );
}
 
export default Homepage;