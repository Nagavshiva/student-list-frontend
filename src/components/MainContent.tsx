import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Modal, useMediaQuery } from '@mui/material';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import { fetchStudents } from '../api/studentAPI';
import { useTheme } from '@mui/material/styles';

export interface Student {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  enrollNumber: string;
  dateOfAdmission: string;
}

const MainContent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 
  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetchStudents();
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    getStudents();
  }, []);

  const handleClickOpen = () => {
    setCurrentStudent(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (student: Student) => {
    setStudents(prevStudents => {
      const updatedStudents = prevStudents.some(s => s._id === student._id)
        ? prevStudents.map(s => (s._id === student._id ? student : s))
        : [...prevStudents, student];
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
    setOpen(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', width: '100%',gap:'1rem' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginBottom: isMobile ? '1rem' : 0 }}>
          Students
        </Typography>
        <TextField placeholder="Search..." variant="outlined" size="small" style={{width:isMobile?'210px':'383px' }} />
        <Button variant="contained" sx={{ backgroundColor: '#22C55E',height:'40px',fontSize:isMobile?'9px':'12px'}} onClick={handleClickOpen}>
          { isMobile ? 'Add':'Add New Student' }
        </Button>
      </div>
      <StudentList students={students} onEdit={(student: Student) => { setCurrentStudent(student); setOpen(true); }} setStudents={setStudents} />
      <Modal open={open} onClose={handleClose}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <StudentForm currentStudent={currentStudent} onSave={handleSave} onCancel={handleClose} />
        </div>
      </Modal>
    </>
  );
};

export default MainContent;




