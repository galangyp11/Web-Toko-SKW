const FormHal2 = ({dataInput, handleInput, onChangeFile, previewImg}) => {
    return ( 
        <div className="form-hal2 d-flex justify-content-center row" style={{ height:"270px"}}>
            <div className="row d-flex justify-content-center">
                            <label htmlFor="nama_toko"  id='label-input'>Nama Toko</label>
                            <input
                                className='input-text'
                                type="text"
                                placeholder='Toko Serba Ada...'
                                id="nama_toko"
                                value={dataInput.nama_toko}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="row d-flex justify-content-center">
                        <label htmlFor="nama_toko"  id='label-input'>Logo Toko</label>
                        </div>

                        <div className="row d-flex justify-content-start px-5 py-2">
                            <div className="bg-foto-daftar-penjual border mx-5 d-flex justify-content-center align-items-center">
                                {previewImg?.map((data, index) => {
                                    return(
                                    <img className='foto-daftar-penjual' src={`${data}`} key={index} alt="" />
                                )
                                })}
                            </div>
                        </div>
                        <div className="row d-flex align-items-center">
                            <div className="col px-5" >
                            <input
                                id="imageFile"
                                type="file"
                                style={{ color: "transparent" }}
                                multiple
                                onChange={onChangeFile}
                                accept="image/png"
                                className="mx-5"
                            />
                            </div>
                        </div>
                        
        </div>
     );
}
 
export default FormHal2;