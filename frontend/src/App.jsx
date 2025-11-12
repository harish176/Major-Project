import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Administration from "./pages/Administration.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminStudents from "./pages/admin/AdminStudents.jsx";
import AdminFaculty from "./pages/admin/AdminFaculty.jsx";
import AdminTPC from "./pages/admin/AdminTPC.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Academics from "./pages/Academics.jsx";
import Facilities from "./pages/Facilities.jsx";
import TPC from "./pages/TPC.jsx";
import Clubs from "./pages/Clubs.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";

// Import Admin components
// import AdminLayout from "./components/AdminLayout.jsx";
import Director from "./pages/administration/Director.jsx";
import FinanceCommittee from "./pages/administration/FinanceCommittee.jsx";
import Chairperson from "./pages/administration/Chairperson.jsx";
import DeansFaculty from "./pages/administration/Deans.jsx";
import Registrar from "./pages/administration/Registrar.jsx";
import Faculty from "./pages/administration/Faculty.jsx";

//Academics imports
import UGProgram from "./pages/academics/UGProgram.jsx";
import PGProgram from "./pages/academics/PGProgram.jsx";
import PhD from "./pages/academics/PhD.jsx";
import Scholarship from "./pages/academics/Scholarship.jsx";
import Dualdegree from "./pages/academics/Dualdegree.jsx";
import Departments from "./pages/academics/Departments.jsx";

//TPC imports
import TPCHome from "./pages/tpc/TPCHome.jsx";
import PlacementTeam from "./pages/tpc/PlacementTeam.jsx";
import PlacementPolicy from "./pages/tpc/PlacementPolicy.jsx";

import Notice from "./pages/Notice.jsx";
import ActsAndRules from "./pages/ActsAndRules.jsx";
import RTIAndPublicGrievance from "./pages/RTIAndPublicGrievance.jsx";
import AntiRagging from "./pages/AntiRagging.jsx";
import NewslettersAndMagazines from "./pages/NewslettersAndMagazines.jsx";
import Careers from "./pages/Careers.jsx";
import Tender from "./pages/Tender.jsx";
import History from "./pages/History.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import VisionGoals from "./pages/VisionGoals.jsx";
import Research from "./pages/Research.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

// Component to handle conditional navbar rendering
function AppContent() {
  const location = useLocation();
  
  // Define routes where navbar and footer should be hidden
  const hideNavbarRoutes = ['/student-dashboard', '/admin-dashboard', '/admin/students', '/admin/faculty', '/admin/tpc'];
  
  // Check if current route should hide navbar
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div className={shouldHideNavbar ? "" : "p-6 pt-20"}>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />

          {/* Nested Admin Routes */}
          <Route path="/administration/*" element={<Administration />}>
            <Route path="director" element={<Director />} />
            <Route path="finance" element={<FinanceCommittee />} />
            <Route path="chairperson" element={<Chairperson />} />
            <Route path="deans" element={<DeansFaculty />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="faculty" element={<Faculty />} />
          </Route>

          <Route path="/academics" element={<Academics />} />
          <Route path="/academics/dual-degree" element={<Dualdegree />} />
          <Route path="/academics/ug" element={<UGProgram />} />
          <Route path="/academics/pg" element={<PGProgram />} />
          <Route path="/academics/phd" element={<PhD />} />
          <Route path="/academics/departments" element={<Departments />} />
          <Route path="/academics/scholarship" element={<Scholarship />} />
          <Route path="/facilities" element={<Facilities />} />
          
          {/* Nested TPC Routes */}
          <Route path="/tpc/*" element={<TPC />}>
            <Route path="home" element={<TPCHome />} />
            <Route path="placement-team" element={<PlacementTeam />} />
            <Route path="placement-policy" element={<PlacementPolicy />} />
            <Route index element={<TPCHome />} />
          </Route>
          
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/acts-rules" element={<ActsAndRules />} />
          <Route path="/rti-grievance" element={<RTIAndPublicGrievance />} />
          <Route path="/anti-ragging" element={<AntiRagging />} />
          <Route path="/newsletter" element={<NewslettersAndMagazines />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/tender" element={<Tender />} />
          <Route path="/history" element={<History />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/vision-goals" element={<VisionGoals />} />
          <Route path="/research" element={<Research />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-dashboard" element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/students" element={
            <ProtectedRoute requiredRole="admin">
              <AdminStudents />
            </ProtectedRoute>
          } />
          <Route path="/admin/faculty" element={
            <ProtectedRoute requiredRole="admin">
              <AdminFaculty />
            </ProtectedRoute>
          } />
          <Route path="/admin/tpc" element={
            <ProtectedRoute requiredRole="admin">
              <AdminTPC />
            </ProtectedRoute>
          } />

          {/* 404 Page */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
      {!shouldHideNavbar && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
