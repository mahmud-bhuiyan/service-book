import { Outlet, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Outlet />
      <Navigate to="/login" replace />
    </div>
  );
};

export default App;
