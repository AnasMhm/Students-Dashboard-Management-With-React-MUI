import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
import { ThemeProvider } from '@emotion/react';
import { useThemeContext } from './contexts/ThemeContext';
import Login from './pages/Login';
import LoadingSpinner from './components/common/LoadingSpinner';
import AdminRoute from './components/ProtectedRoutes/AdminRoute';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Students = lazy(() => import('./pages/Students'));
const Student = lazy(() => import('./pages/Student'));
const Courses = lazy(() => import('./pages/Courses'));
const Enrollments = lazy(() => import('./pages/Enrollments'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));

const App = () => {
  const { mode } = useThemeContext();
  const theme = mode;

  return (
    <ThemeProvider theme={{ theme }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminRoute />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/students' element={<Students />} />
            </Route>
            <Route path='/students/:id' element={<Student />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/enrollments' element={<Enrollments />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
