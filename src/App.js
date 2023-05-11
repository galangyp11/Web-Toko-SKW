import { Route, Routes } from 'react-router-dom';

import Homepage from './components/publicuser/Homepage';
import DescItem from './components/publicuser/DescItem';
import DescCategory from './components/publicuser/DescCategory';
import Login from './components/publicuser/Login';
import PublicRoutes from './components/PublicRoutes';

import ProtectedRoutes from './components/ProtectedRoutes';
import PageAdmin from './components/admin/PageAdmin';

import ProfilePembeli from './components/pembeli/ProfilePembeli';
import DaftarPembeli from './components/pembeli/DaftarPembeli';
import Keranjang from './components/pembeli/keranjang/Keranjang';

import PagePenjual from './components/penjual/PagePenjual';
import DaftarPenjual from './components/penjual/DaftarPenjual';
import ProfileToko from './components/penjual/ProfileToko';
import ItemToko from './components/penjual/ItemToko';

function App() {
  
  return (
   <Routes>
      <Route element={<PublicRoutes/>}>
        <Route path='/' element={<Homepage />}/>
        <Route path='/kategori/:id' element={<DescCategory/>}/>
        <Route path='/item/:id' element={<DescItem/>}/>
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path='/profile' element={<ProfilePembeli/>}/>
        <Route path='/keranjang' element={<Keranjang/>}/>
        
        <Route element={<PagePenjual/>}>
          <Route path='/profile-toko' element={<ProfileToko/>}/>
          <Route path='/item-toko' element={<ItemToko/>}/>
        </Route>
      </Route>

      <Route path='/login' element={<Login/>}/>
      <Route path='/daftar-pembeli' element={<DaftarPembeli/>}/>
      <Route path='/daftar-penjual' element={<DaftarPenjual/>}/>

      <Route path='/admin' element={<PageAdmin/>}/>
   </Routes>
  );
}

export default App;
