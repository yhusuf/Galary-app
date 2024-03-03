import React from 'react';
import Home from './Home';
import Searched from './Searched';
import Popular from './Popular';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Collec from './Collec';

function Pages() {
    const Location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={Location} key={Location.pathname}>
        <Route path='/' element={<Home/>}/>
        <Route path='/searched/:search' element = {<Searched/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/collections/'  element={<Collec/>} />
      </Routes>
    </AnimatePresence>

  )
}

export default Pages