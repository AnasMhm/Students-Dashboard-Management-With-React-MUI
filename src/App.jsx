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
import { darkTheme } from './theme';
import { ThemeProvider } from '@emotion/react';
const App = () => {
  const theme =  darkTheme;
  const IsLoggedIn = true;
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/students' element={<Students />} />
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
