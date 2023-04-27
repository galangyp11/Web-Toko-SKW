import logo from './image/logo-skw.png'
import search from './image/search.png'
import './navbar.css'

const Navbar = () => {
    return ( 
        <div className="navbar">
            <div className="row d-flex align-items-center" style={{ width:'99%', height:'60px', marginTop:'-12px', marginLeft:'10px'}}>
                <div className="col " style={{marginRight:'200px'}}>
                    <img className='logo' src={logo} alt="logo bang"/>
                </div>
                <div className="col-6 pr-n5" style={{marginRight:'-140px'}}>
                    <input className='search p-2 text-center' type="text" placeholder='Search' />                 
                </div>
                <div className="col" style={{ marginLeft:'-200px'}}>
                    <div className="logo-search d-flex justify-content-center">
                        <img src={search} alt=""/>
                    </div>
                </div>
                <div className="col-2 ">
                    <h5>Daftar | Login</h5>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;