import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { ThemeProvider } from '@emotion/react';
import { useThemeContext } from './contexts/ThemeContext';
import Student from './pages/Student';
const App = () => {
  const { mode } = useThemeContext();
  const theme = mode;
  return (
    <ThemeProvider theme={{ theme }}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/students' element={<Students />} />
          <Route path='/students/:id' element={<Student />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/enrollments' element={<Enrollments />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
