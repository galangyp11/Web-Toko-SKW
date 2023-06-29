const FormHal3 = ({dataInput, handleInput}) => {
    return ( 
        <div className="form-hal3 d-flex justify-content-center row" style={{ height:"270px"}}>
            <div className="row d-flex justify-content-center">
                            <label htmlFor="nama_toko"  id='label-input'>Alamat</label>
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
                            <label htmlFor="nama_toko"  id='label-input'>No Rekening</label>
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
                            <label htmlFor="nama_toko"  id='label-input'>No Whatsapp</label>
                            <input
                                className='input-text'
                                type="text"
                                placeholder='Toko Serba Ada...'
                                id="nama_toko"
                                value={dataInput.nama_toko}
                                onChange={handleInput}
                            />
                        </div>
        </div>
     );
}
 
export default FormHal3;