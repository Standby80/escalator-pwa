import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ChecklistPage from './pages/ChecklistPage';
import EquipmentDetails from './pages/EquipmentDetails';
import AddEquipment from './pages/AddEquipment';
import Layout from './components/Layout';
import Login from './pages/Login';

// Mock simple auth guard
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('mock_user') === 'true';
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="equipment/:id" element={<EquipmentDetails />} />
          <Route path="add-equipment" element={<AddEquipment />} />
          <Route path="checklist/:id" element={<ChecklistPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
