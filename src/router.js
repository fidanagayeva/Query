import React from 'react';
import { Route, Routes } from 'react-router-dom';
import JobList from './pages/JobList';
import JobCreate from './pages/JobCreate';
import JobEdit from './pages/JobEdit';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/job/list" element={<JobList />} />
      <Route path="/job/create" element={<JobCreate />} />
      <Route path="/job/edit/:id" element={<JobEdit />} />
    </Routes>
  );
};

export default AppRoutes;
