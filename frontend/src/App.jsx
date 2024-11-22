import { useState } from 'react';
import Newspaper from "./pages/Newspaper.jsx";
import Newspaper2 from "./pages/Newspaper2.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Form from "./pages/Form.jsx";
import SignIn from './pages/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Author from './pages/Author.jsx';
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Bar from './components/Bar.jsx';
import Line from './components/Line.jsx';
import Donut from './components/Donut.jsx';
import User from './pages/User.jsx';
const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');

  if (allowedRoles.includes(userRole)) {
    return children;
  } 
  else if(userRole == "User")
  {
    return <Navigate to="/Newspaper" /> 
  }
  else {
    return <Navigate to="/" />;
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-vine w-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Form />} />

          <Route
            path="/Newspaper"
            element={
              <PrivateRoute allowedRoles={['Admin', 'User']}>
                <Newspaper currentPage={currentPage} />
              </PrivateRoute>
            }
          />
          <Route
            path="/Newspaper2"
            element={
              <PrivateRoute allowedRoles={['Admin', 'User']}>
                <Newspaper2 currentPage={currentPage + 1} />
              </PrivateRoute>
            }
          />
          <Route
            path="/Author"
            element={
              <PrivateRoute allowedRoles={['Admin', 'User']}>
                <Author />
              </PrivateRoute>
            }
          />

          <Route
            path="/Dashboard"
            element={
              <PrivateRoute allowedRoles={['Admin']}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/Bar"
            element={
              <PrivateRoute allowedRoles={['Admin']}>
                <Bar />
              </PrivateRoute>
            }
          />
          <Route
            path="/Line"
            element={
              <PrivateRoute allowedRoles={['Admin']}>
                <Line />
              </PrivateRoute>
            }
          />
          <Route
            path="/Donut"
            element={
              <PrivateRoute allowedRoles={['Admin']}>
                <Donut />
              </PrivateRoute>
            }
          />
          <Route
            path="/User"
            element={
              <PrivateRoute allowedRoles={['User']}>
                <User />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
