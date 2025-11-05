import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { tpcFacultyCoordinators } from "../../data/placementTPCFaculty.js";
import { tpcstudentbtech } from "../../data/tpcstudentbtech.js";
import { tpcstudentmtech } from "../../data/tpcstudentmtech.js";
import { 
  extractSessionsFromData, 
  calculatePagination, 
  createPageChangeHandler, 
  filterAndSearchData
} from "./utils/sessionUtils.js";
import PaginationControls from "./components/PaginationControls.jsx";

export default function PlacementTeam() {
  const [selectedSession, setSelectedSession] = useState("2025-2026");
  const [selectedStudentSession, setSelectedStudentSession] = useState("2025-2026");
  const [selectedMtechSession, setSelectedMtechSession] = useState("2025-2026");
  const [facultySearchTerm, setFacultySearchTerm] = useState("");
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [mtechSearchTerm, setMtechSearchTerm] = useState("");
  const [currentFacultyPage, setCurrentFacultyPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMtechPage, setCurrentMtechPage] = useState(1);
  const studentsPerPage = 10;
  const facultyPerPage = 10;

  // Get faculty sessions from data using utility function
  const availableFacultySessions = useMemo(() => {
    return extractSessionsFromData(
      tpcFacultyCoordinators.training_placement_faculty_coordinators,
      'session'
    );
  }, []);

  // Get B.Tech student sessions from data using utility function
  const availableStudentSessions = useMemo(() => {
    return extractSessionsFromData(
      tpcstudentbtech.training_placement_committee_2025_2026,
      'session'
    );
  }, []);

  // Get M.Tech student sessions from data using utility function
  const availableMtechSessions = useMemo(() => {
    return extractSessionsFromData(
      tpcstudentmtech.mtech_training_placement_committee_2025_2026,
      'session'
    );
  }, []);

  // Filter faculty based on selected session
  const filteredFaculty = useMemo(() => {
    return tpcFacultyCoordinators.training_placement_faculty_coordinators.filter(faculty => 
      faculty.session.includes(selectedSession)
    );
  }, [selectedSession]);

  // Get students data and available sessions
  const studentsData = useMemo(() => {
    return tpcstudentbtech.training_placement_committee_2025_2026;
  }, []);

  // Get M.Tech students data
  const mtechStudentsData = useMemo(() => {
    return tpcstudentmtech.mtech_training_placement_committee_2025_2026;
  }, []);

  // Filter and search faculty
  const searchedFaculty = useMemo(() => {
    return filterAndSearchData(
      filteredFaculty, 
      selectedSession, 
      facultySearchTerm, 
      ['name', 'department', 'role']
    );
  }, [filteredFaculty, selectedSession, facultySearchTerm]);

  // Filter and search students
  const filteredAndSearchedStudents = useMemo(() => {
    return filterAndSearchData(
      studentsData, 
      selectedStudentSession, 
      studentSearchTerm, 
      ['name', 'department', 'role', 'team']
    );
  }, [studentsData, selectedStudentSession, studentSearchTerm]);

  // Filter and search M.Tech students
  const filteredAndSearchedMtechStudents = useMemo(() => {
    return filterAndSearchData(
      mtechStudentsData, 
      selectedMtechSession, 
      mtechSearchTerm, 
      ['name', 'department', 'specialization']
    );
  }, [mtechStudentsData, selectedMtechSession, mtechSearchTerm]);

  // Reset current page when search term or session changes
  const resetFacultyPageOnChange = useMemo(() => {
    setCurrentFacultyPage(1);
  }, [selectedSession, facultySearchTerm]);

  const resetPageOnChange = useMemo(() => {
    setCurrentPage(1);
  }, [selectedStudentSession, studentSearchTerm]);

  const resetMtechPageOnChange = useMemo(() => {
    setCurrentMtechPage(1);
  }, [selectedMtechSession, mtechSearchTerm]);

  // Faculty Pagination calculations
  const {
    totalPages: totalFacultyPages,
    startIndex: facultyStartIndex,
    endIndex: facultyEndIndex,
    currentItems: currentFaculty
  } = useMemo(() => calculatePagination(searchedFaculty, currentFacultyPage, facultyPerPage), 
    [searchedFaculty, currentFacultyPage, facultyPerPage]);

  // B.Tech Pagination calculations
  const {
    totalPages,
    startIndex,
    endIndex,
    currentItems: currentStudents
  } = useMemo(() => calculatePagination(filteredAndSearchedStudents, currentPage, studentsPerPage), 
    [filteredAndSearchedStudents, currentPage, studentsPerPage]);

  // M.Tech Pagination calculations
  const {
    totalPages: totalMtechPages,
    startIndex: mtechStartIndex,
    endIndex: mtechEndIndex,
    currentItems: currentMtechStudents
  } = useMemo(() => calculatePagination(filteredAndSearchedMtechStudents, currentMtechPage, studentsPerPage), 
    [filteredAndSearchedMtechStudents, currentMtechPage, studentsPerPage]);

  // Handle page change
  const handleFacultyPageChange = createPageChangeHandler(setCurrentFacultyPage);
  const handlePageChange = createPageChangeHandler(setCurrentPage);
  const handleMtechPageChange = createPageChangeHandler(setCurrentMtechPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#002147] text-center mb-8">
        Placement Team Faculty
      </h1>

      {/* Faculty Session Filter and Search */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="session-select" className="text-lg font-semibold text-[#002147]">
              Select Session:
            </label>
            <select
              id="session-select"
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
            >
              {availableFacultySessions.map(session => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="faculty-search" className="text-lg font-semibold text-[#002147]">
              Search Faculty:
            </label>
            <input
              id="faculty-search"
              type="text"
              placeholder="Search by name, department, or role..."
              value={facultySearchTerm}
              onChange={(e) => setFacultySearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent w-full sm:w-80"
            />
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 text-center">
          Showing {facultyStartIndex + 1}-{Math.min(facultyEndIndex, searchedFaculty.length)} of {searchedFaculty.length} faculty members for session {selectedSession}
          {facultySearchTerm && ` matching "${facultySearchTerm}"`}
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#002147] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Mobile No
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentFaculty.map((faculty, index) => (
                <tr 
                  key={faculty.sNo} 
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {facultyStartIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#002147]">
                    {faculty.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {faculty.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {faculty.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <a 
                      href={`tel:+91${faculty.contact_no}`}
                      className="text-[#002147] hover:text-blue-600 hover:underline"
                    >
                      +91 {faculty.contact_no}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {searchedFaculty.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No faculty members found for the selected criteria.
          </div>
        )}
      </div>

      {/* Faculty Pagination */}
      <PaginationControls
        currentPage={currentFacultyPage}
        totalPages={totalFacultyPages}
        onPageChange={handleFacultyPageChange}
      />

      {/* B.Tech Student TPC Members Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6 mt-12"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#002147] text-center">
          B.Tech Student TPC Members
        </h2>

        {/* Student Session Filter and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label htmlFor="student-session-select" className="text-lg font-semibold text-[#002147]">
                Select Session:
              </label>
              <select
                id="student-session-select"
                value={selectedStudentSession}
                onChange={(e) => setSelectedStudentSession(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
              >
                {availableStudentSessions.map(session => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label htmlFor="student-search" className="text-lg font-semibold text-[#002147]">
                Search Students:
              </label>
              <input
                id="student-search"
                type="text"
                placeholder="Search by name, department, role, or team..."
                value={studentSearchTerm}
                onChange={(e) => setStudentSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent w-full sm:w-80"
              />
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSearchedStudents.length)} of {filteredAndSearchedStudents.length} student members for session {selectedStudentSession}
            {studentSearchTerm && ` matching "${studentSearchTerm}"`}
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#002147] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Contact No
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentStudents.map((student, index) => (
                  <tr 
                    key={`${student.name}-${student.contact_no}`} 
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#002147]">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {student.department || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="max-w-xs">
                        {student.team}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        student.role.includes('Head') ? 'bg-red-100 text-red-800' :
                        student.role.includes('Coordinator') ? 'bg-blue-100 text-blue-800' :
                        student.role.includes('Co') ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {student.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <a 
                        href={`tel:+91${student.contact_no}`}
                        className="text-[#002147] hover:text-blue-600 hover:underline"
                      >
                        +91 {student.contact_no}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSearchedStudents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No students found for the selected criteria.
            </div>
          )}
        </div>

        {/* B.Tech Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </motion.div>

      {/* M.Tech Student TPC Members Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6 mt-12"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#002147] text-center">
          M.Tech Student TPC Members
        </h2>

        {/* M.Tech Student Session Filter and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label htmlFor="mtech-session-select" className="text-lg font-semibold text-[#002147]">
                Select Session:
              </label>
              <select
                id="mtech-session-select"
                value={selectedMtechSession}
                onChange={(e) => setSelectedMtechSession(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
              >
                {availableMtechSessions.map(session => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label htmlFor="mtech-search" className="text-lg font-semibold text-[#002147]">
                Search M.Tech Students:
              </label>
              <input
                id="mtech-search"
                type="text"
                placeholder="Search by name, department, or specialization..."
                value={mtechSearchTerm}
                onChange={(e) => setMtechSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent w-full sm:w-80"
              />
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {mtechStartIndex + 1}-{Math.min(mtechEndIndex, filteredAndSearchedMtechStudents.length)} of {filteredAndSearchedMtechStudents.length} M.Tech student members for session {selectedMtechSession}
            {mtechSearchTerm && ` matching "${mtechSearchTerm}"`}
          </div>
        </div>

        {/* M.Tech Student Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#002147] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Contact No
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentMtechStudents.map((student, index) => (
                  <tr 
                    key={`${student.name}-${student.contact_no}`} 
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {mtechStartIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#002147]">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {student.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="max-w-xs">
                        {student.specialization}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <a 
                        href={`tel:+91${student.contact_no}`}
                        className="text-[#002147] hover:text-blue-600 hover:underline"
                      >
                        +91 {student.contact_no}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSearchedMtechStudents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No M.Tech students found for the selected criteria.
            </div>
          )}
        </div>

        {/* M.Tech Pagination */}
        <PaginationControls
          currentPage={currentMtechPage}
          totalPages={totalMtechPages}
          onPageChange={handleMtechPageChange}
        />
      </motion.div>

    </motion.div>
  );
}