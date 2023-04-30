import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Data from './components/data.json'

import Homepage from './components/Homepage';
import DescItem from './components/DescItem';

function App() {

  // const [datum, setDatum] = useState([])

  // useEffect(()=>{
  //   dataDB()
  // },[]) 

  // const dataDB = async () => {
  //   const response = await axios.get(`http://localhost:3311/`)
  //   setDatum(response.data)
  //   console.log(response)
  // }
  
  return (
   <Routes>
      <Route path='/' element={<Homepage />}/>

      <Route path='/:id' element={<DescItem/>}/>
   </Routes>
  );
}

export default App;
