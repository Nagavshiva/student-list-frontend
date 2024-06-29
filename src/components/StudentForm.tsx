import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createStudent, updateStudent } from '../api/studentAPI';

export interface Student {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  enrollNumber: string;
  dateOfAdmission: string;
}
interface StudentFormProps {
  currentStudent?: Student | null;
  onSave: (student: Student) => void;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ currentStudent, onSave, onCancel }) => {
  const [student, setStudent] = useState<Student>(currentStudent || {
    name: '',
    email: '',
    phoneNumber: '',
    enrollNumber: '',
    dateOfAdmission: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentStudent && currentStudent._id) {
        const updatedStudent = await updateStudent(currentStudent._id, student);
        onSave(updatedStudent.data);
      } else {
        const response = await createStudent(student);
        onSave(response.data);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save student:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
        alignItems: 'center',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '384px',
        height: '510px',
        margin: '0.6rem auto',
        backgroundColor: 'whitesmoke'
      }}
    >
      <Typography variant="h6" component="div" gutterBottom>
        {currentStudent ? 'Edit Student' : 'Add New Student'}
      </Typography>
      <TextField name="name" label="Name" variant="outlined" fullWidth value={student.name} onChange={handleChange} />
      <TextField name="email" label="Email" variant="outlined" fullWidth value={student.email} onChange={handleChange} />
      <TextField name="phoneNumber" label="Phone" variant="outlined" fullWidth value={student.phoneNumber} onChange={handleChange} />
      <TextField name="enrollNumber" label="Enroll Number" variant="outlined" fullWidth value={student.enrollNumber} onChange={handleChange} />
      <TextField name="dateOfAdmission" label="Date of Admission" type="date" variant="outlined" fullWidth value={student.dateOfAdmission} onChange={handleChange} InputLabelProps={{ shrink: true }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '1rem', flexDirection: 'column', gap: '1rem' }}>
        <Button sx={{ backgroundColor: '#22C55E', color: 'white' }} onClick={handleSubmit}>
          Submit
        </Button>
        <Button sx={{ backgroundColor: '#C55D22', color: 'white' }} onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default StudentForm;
