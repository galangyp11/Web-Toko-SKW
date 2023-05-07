import './homepage.css'

import Items from './Items';
import Category from './Category';
import Banner from './Banner';

const Homepage = () => {

    return ( 
        <div className="homepage-con container">
            <div className='row'>
                <div className="col">
                    <Banner/>
                </div> 
            </div>

            <div className='row'>
                <div className="col">
                    <Category/>
                </div> 
            </div>

            <div className="row">
                <div className="col">
                    <Items />    
                </div>
            </div>
        </div>
     );
}
 
export default Homepage;