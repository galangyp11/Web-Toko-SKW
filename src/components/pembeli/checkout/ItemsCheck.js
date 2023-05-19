const ItemsCheck = ({dataCheckout}) => {

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    return (
        dataCheckout.map((item)=>{

            const foto = btoa(String.fromCharCode(...new Uint8Array(item.foto_item.data)))

            return(
                <div className="items-keranjang my-3" key={item.id_checkout}>
                    <div className="row d-flex justify-content-center align-items-center px-3" style={{height:"100%", width:"100%"}}>
                        <div className="col-2  d-flex justify-content-center align-items-center" style={{height:"100%"}}>
                            <img className='img-items-keranjang' src={`data:image/png;base64,${foto}`}/>
                        </div>
                        <div className="col  py-2" style={{height:"100%"}}>
                            <div className="row">
                                <p className='text-nama-item-keranjang' >{item.nama_item}</p>
                            </div>  
                        <div className="row">
                                <p>{formatUang(item.harga_item).replace(/\,00/g, '')}</p>
                        </div>
                            
                        </div>
                        <div className="col-3 ">
                            <div className="row d-flex justify-content-center">
                                <div className="col-4 ">
                                    <p>Jumlah</p>
                                </div>
                            </div>
                            <div className="row ">   
                                <div className="col  d-flex justify-content-center align-items-center">

                                        <p 
                                            className='text-jumlah-keranjang px-3 py-2' 
                                            // placeholder={item.jumlah}
                                            // value={}
                                        >{item.jumlah}</p>
                                    
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
            
                </div>
        )
    })
     );
}
 
export default ItemsCheck;