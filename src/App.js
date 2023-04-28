import './App.css';
import { Route, Routes } from 'react-router-dom';

import Homepage from './components/Homepage';
import DescItem from './components/DescItem';

function App() {
  return (
   <Routes>
      <Route path='/' element={<Homepage/>}/>

      <Route path='/item' element={<DescItem/>}/>
   </Routes>
  );
}

export default App;
