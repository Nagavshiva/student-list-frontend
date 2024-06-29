import React from 'react';
import { List, ListItem, ListItemText, Avatar, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          background: 'linear-gradient(to right,#1E40AF,#9333EA)',
        },
      }}
      ModalProps={{
        keepMounted: true, 
      }}
    >
      <List>
        <ListItem>
          <Avatar alt="Admin" src="/static/images/avatar/1.jpg" style={{ marginRight: '10px',backgroundColor:'white' ,color:'grey'}} />
          <ListItemText primary="Yellow Owl" secondary="Admin"  sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
