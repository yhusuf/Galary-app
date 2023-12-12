import React from 'react';
import Home from './Home';
import Searched from './Searched';
import { Route, Routes, useLocation } from 'react-router-dom';

function Pages() {
    const Location = useLocation()
  return (
    <Routes location={Location} key={Location.pathname}>
        <Route path='/' element={<Home/>}/>
        <Route path='/Searched/:search' element = {<Searched/>}/>
    </Routes>
  )
}

export default Pages