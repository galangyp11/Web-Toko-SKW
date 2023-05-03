import { Route, Routes } from 'react-router-dom';

import Homepage from './components/Homepage';
import DescItem from './components/DescItem';
import DescCategory from './components/DescCategory';
import Login from './components/Login';
import PageAdmin from './components/admin/PageAdmin';
import PagePembeli from './components/pembeli/PagePembeli';
import PagePenjual from './components/penjual/PagePenjual';
import DaftarPembeli from './components/pembeli/DaftarPembeli';

function App() {
  
  return (
   <Routes>
      <Route path='/' element={<Homepage />}/>

      <Route path='/category/:id' element={<DescCategory/>}/>

      <Route path='/item/:id' element={<DescItem/>}/>

      <Route path='/login' element={<Login/>}/>

      <Route path='/admin/:id' element={<PageAdmin/>}/>

      <Route path='/pembeli/:id' element={<PagePembeli/>}/>

      <Route path='/penjual/:id' element={<PagePenjual/>}/>

      <Route path='/daftar-pembeli' element={<DaftarPembeli/>}/>

   </Routes>
  );
}

export default App;
