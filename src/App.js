import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import the correct components
import Main from './pages/main';
import Navbar from './componnent/navbar';
import Cart from './pages/cart';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} /> {/* Use 'element' instead of 'Component' */}
        <Route path='/cart' element={<Cart />}/>
      </Routes>

    </>
  );
}

export default App;
