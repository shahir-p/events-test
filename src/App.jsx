import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';


import Login from './Pages/Login';

import Boysmodule from './Boysmodule';
import Boyscaptainmodule from './Boyscaptainmodule';
import Captainmodule from './Captainmodule';
import Managermodule from './Managermodule';



const App = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateDimensions = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup the event listener
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Redirect for non-mobile devices
  if (!isMobile) {
    return <h1>This app is only available on mobile devices.</h1>;
  }

  return (
    <Router>
    
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<Login height={height} width={width} />} />

          {/* User Module Routes */}
          <Route path="/boys/*" element={<Boysmodule height={height} width={width}/>} />

          {/* User Module Routes */}
          <Route path="/boyscaptain/*" element={<Boyscaptainmodule height={height} width={width}/>} />

          {/* Captain Module Routes */}
          <Route path="/captain/*" element={<Captainmodule height={height} width={width}/>} />
         
          {/* Captain Module Routes */}
          <Route path="/manager/*" element={<Managermodule height={height} width={width}/>} />

        </Routes>
   
    </Router>
  );
};

export default App;
