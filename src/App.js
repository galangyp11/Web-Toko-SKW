import { Route, Routes } from 'react-router-dom';

import Homepage from './components/Homepage';
import DescItem from './components/DescItem';
import DescCategory from './components/DescCategory';
import Login from './components/Login';
import PageAdmin from './components/admin/PageAdmin';
import PagePembeli from './components/pembeli/PagePembeli';
import PagePenjual from './components/penjual/PagePenjual';

function App() {
  
  return (
   <Routes>
      <Route path='/' element={<Homepage />}/>

      <Route path='/category' element={<DescCategory/>}/>

      <Route path='/item/:id' element={<DescItem/>}/>

      <Route path='/Login' element={<Login/>}/>

      <Route path='/Admin/:id' element={<PageAdmin/>}/>

      <Route path='/Pembeli/:id' element={<PagePembeli/>}/>

      <Route path='/Penjual/:id' element={<PagePenjual/>}/>
   </Routes>
  );
}

export default App;
