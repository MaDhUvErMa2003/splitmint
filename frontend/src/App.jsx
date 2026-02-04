import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import ExpenseHistory from "./pages/ExpenseHistory";
import Balance from "./pages/Balance";
import GroupDashboard from "./pages/GroupDashboard";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes with Navbar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              
                <Dashboard />
              
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Groups />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups/:groupId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <GroupDetails />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups/:groupId/expenses"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ExpenseHistory />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups/:groupId/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <GroupDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/balance/:groupId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Balance />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
