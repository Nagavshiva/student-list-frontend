import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForm from './DeleteForm';
import { deleteStudent } from '../api/studentAPI';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export interface Student {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  enrollNumber: string;
  dateOfAdmission: string;
}

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, setStudents }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleOpenDelete = (student: Student) => {
    setStudentToDelete(student);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmDelete = async () => {
    if (studentToDelete && studentToDelete._id) {
      try {
        await deleteStudent(studentToDelete._id);
        const updatedStudents = students.filter(student => student._id !== studentToDelete._id);
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        setStudents(updatedStudents);
        setOpenDelete(false);
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  return (
    <>
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#F9FAFB' }}>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              {!isMobile && !isTablet && <TableCell>PHONE</TableCell>}
              {!isMobile && !isTablet && <TableCell>ENROLL NUMBER</TableCell>}
              {!isMobile && !isTablet && <TableCell>DATE OF ADMISSION</TableCell>}
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                {!isMobile && !isTablet && <TableCell>{student.phoneNumber}</TableCell>}
                {!isMobile && !isTablet && <TableCell>{student.enrollNumber}</TableCell>}
                {!isMobile && !isTablet && <TableCell>{new Date(student.dateOfAdmission).toLocaleDateString()}</TableCell>}
                <TableCell sx={{display:'flex'}}>
                  <IconButton color="primary" aria-label="edit student" onClick={() => onEdit(student)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete student" onClick={() => handleOpenDelete(student)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <DeleteForm onConfirm={handleConfirmDelete} onCancel={handleCloseDelete} />
      </Modal>
    </>
  );
};

export default StudentList;

