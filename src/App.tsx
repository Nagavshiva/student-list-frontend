// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
// import StudentForm from './components/StudentForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/add-student" element={<StudentForm />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
