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

import PagePenjual from './components/penjual/PagePenjual';


function App() {
  
  return (
   <Routes>
      <Route element={<PublicRoutes/>}>
        <Route path='/' element={<Homepage />}/>
        <Route path='/kategori/:id' element={<DescCategory/>}/>
        <Route path='/item/:id' element={<DescItem/>}/>
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path='/admin/:id' element={<PageAdmin/>}/>
        <Route path='/pembeli/profile' element={<ProfilePembeli/>}/>
        <Route path='/penjual/:id' element={<PagePenjual/>}/>
      </Route>

      <Route path='/login' element={<Login/>}/>
      <Route path='/daftar-pembeli' element={<DaftarPembeli/>}/>
   </Routes>
  );
}

export default App;
