import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Administration from "./pages/Administration.jsx";
import Academics from "./pages/Academics.jsx";
import Research from "./pages/Research.jsx";
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


export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6 pt-20">
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
          <Route path="/research" element={<Research />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/tpc" element={<TPC />} />
          <Route path="/clubs" element={<Clubs />} />

          {/* 404 Page */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
