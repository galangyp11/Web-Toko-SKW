import './homepage.css'
import Items from './Items';
import Recomendation from './Recomendation';
import Navbar from './Navbar';

const Homepage = () => {
    return ( 
        <div className="homepage">
            <div className="navbar-home sticky-top">
                <Navbar/>
            </div>
            <div className="container ">
                <div>
                    <Recomendation/>
                </div>
                <div className="">
                    <Items/>
                </div>
                
            </div>
        </div>
     );
}
 
export default Homepage;