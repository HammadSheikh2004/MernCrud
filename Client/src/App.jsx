import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js'
import InsertData from './Components/Pages/InsertData';
import DisplayData from './Components/Pages/DisplayData';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditData from './Components/Pages/EditData';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<InsertData />} path='/' />
          <Route element={<DisplayData />} path='/showData' />
          <Route element={<EditData />} path='/editData/:id' />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App