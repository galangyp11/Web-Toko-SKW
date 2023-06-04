import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSearch } from "../context";

const searchItemCon = () => {
    // const [datum, setDatum] = useState([]);
    // const { state } = useSearch();
  
    // useEffect(() => {
    //   const dataDB = async () => {
    //     const response = await axios.get(
    //       `${apiHost}item?search=${state.search}`
    //     );
    //     setDatum(response.data);
    //     // console.log(response)
    //   };
    //   dataDB();
    // }, [state.search]);

    return ( 
        <div className="search-item-con">
            {/* {datum.map((item) => {
                // console.log(item.gambar)
                  return(
                    <div className="item m-2" key={item.id_item} style={{cursor:"pointer", padding:'0px'}}>
                      <Link to={`/item/${item.id_item}`} style={{ textDecoration:"none", color:"black"}}>
                        <div className="img-thumbnail-item" >
                          <img className='item-image' src={item.gambar} alt=""/>
                        </div>
                        <div className="item-thumb-desc item-name mt-1 mx-2">
                          <p className='text-item-name'>{item.nama_item}</p>
                        </div>
                        <br />
                        <div className="item-thumb-desc item-price mx-2">
                          <p className='text-item-price'>{formatUang(item.harga_item).replace(/,00/g, '')}</p>
                        </div>
                        <div className="item-thumb-desc mx-2 ">
                          <p className='text-item-toko d-flex align-items-end pb-1'>{item.nama_toko}</p>
                        </div>
                      </Link>
                    </div>
                  )
          })} */}
        </div>
     );
}
 
export default searchItemCon;