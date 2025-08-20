import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard';
import Students from './pages/students';
import Courses from './pages/courses';
import Enrollments from './pages/enrollments';
import Reports from './pages/reports';
import Settings from './pages/settings';
function App() {
  const IsLoggedIn = true;
  return (
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
  )
}

export default App
