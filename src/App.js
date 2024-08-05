import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './featured/Header';
import Sidebar from './molecules/Sidebar';
import AppRoutes from './router';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;
