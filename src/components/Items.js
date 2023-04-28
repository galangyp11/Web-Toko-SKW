import './items.css'

const items = ({dataItem, dataLength}) => {
    
    return ( 
        <div className="items p-4 mb-5 d-flex justify-content-center align-items-center">
            <div className="row gy-5 row-cols-5">
                <div className="col">
                    <div className="item mx-3">
                        <div className="img-thumbnail-item">

                        </div>
                        <div className="item-name py-1 px-2">
                            <p>{dataItem.nama_barang}</p>
                        </div>
                        <div className="item-price px-2">
                            <h5>{dataItem.harga}</h5>
                        </div>

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default items;