import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface DeleteFormProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteForm: React.FC<DeleteFormProps> = ({ onConfirm, onCancel }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #ccc',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" component="h2">
        Are you sure to delete the student?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 ,gap:'1rem'}}>
        <Button sx={{backgroundColor:'#22C55E',color:'white',width:'169px'}} onClick={onConfirm}>
          Yes
        </Button>
        <Button sx={{backgroundColor:'#C55D22',color:'white',width:'169px'}} onClick={onCancel}>
          No
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteForm;
