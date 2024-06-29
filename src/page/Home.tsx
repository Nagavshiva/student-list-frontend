import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';
import Sidebar from '../components/Sidebar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Home: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuClick = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div style={{ marginLeft: isMobile ? '0' : '15rem' }}>
      <Navbar onMenuClick={handleMenuClick}/>
      <Sidebar open={isSidebarOpen} onClose={handleMenuClick} />
      <div style={{ flexGrow: 1, padding: '20px', marginLeft: isMobile ? 0 : '1rem' }}>
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
