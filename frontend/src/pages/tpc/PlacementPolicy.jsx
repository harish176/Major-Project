import { motion } from "framer-motion";

export default function PlacementPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#002147] text-center mb-8">
          Placement Policies
        </h1>
        
        {/* Header Notice */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-2">Important Notice - Batch 2026-2027</h2>
          <p className="text-sm">
            Students attending campus placement process must note the following regulations effective from September 13, 2024.
          </p>
        </div>

        <div className="space-y-8">
          {/* One Student One Job Policy */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-[#002147] text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-2xl font-bold">One Student One Job Policy</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-1 gap-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-1">1. Single Job Entitlement</h4>
                    <p className="text-gray-700 text-sm">Every student eligible for campus recruitment is entitled to only one job. Students cannot exchange jobs once placed and must study company portfolios before applying.</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-1">2. Pre-Placement Offer (PPO) Restrictions</h4>
                    <p className="text-gray-700 text-sm">Students with placement/PPO offers from 3rd-year internships cannot appear for other placement programs except dream companies.</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-1">3. Internship Selection Policy</h4>
                    <p className="text-gray-700 text-sm">Students with on-campus internships are not eligible for other opportunities. Same applies to final and pre-final year internships.</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-1">4. Competitive Event Selection</h4>
                    <p className="text-gray-700 text-sm">Selections through coding contests, hackathons, or competitive events promoted by T&P cell are considered on-campus selections unless explicitly specified otherwise.</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-1">5. PPO Waiting Period</h4>
                    <p className="text-gray-700 text-sm">Students waiting for PPOs can choose between on-campus offers or PPO. Once any offer is rejected, they cannot sit for other companies except dream companies.</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800 mb-1">6. 6-Month Internship Policy (New)</h4>
                    <p className="text-red-700 text-sm">Students with 6-month internships including performance-based PPOs will not be allowed to sit in further placement process until significant placements are completed in their branches.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dream Status & PSU Policy */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="bg-purple-600 text-white px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-bold">Dream Status Policy</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-4">
                  Dream Status is given to certain companies based on their profile and ongoing placements. 
                  The eligibility lies solely with the Training & Placement Officer.
                </p>
                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                  <p className="text-purple-800 text-sm font-medium">
                    Students must compulsorily accept offers from their dream companies and should only apply if they intend to join.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-bold">PSU Companies</h2>
              </div>
              <div className="p-6">
                <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                  <p className="text-green-800 text-sm font-medium">
                    If a student gets selected in any PSU (Either Dream or Normal), 
                    they are not eligible for any other company, whatsoever be the company's status.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsored Candidates */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-orange-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Sponsored Candidates Policy</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">MTech Students</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Self-sponsored students are allowed for placements
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Company-sponsored students are not allowed for on-campus opportunities
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">MBA/MUDP & Ph.D.</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Sponsored students are not allowed for campus placements
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* New Policies */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">New Policies (Effective from Sept 13, 2024)</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">2-Month Internship Policy</h4>
                <p className="text-gray-700 text-sm mb-2">
                  Students with 2-month internships can sit for all placements. If they receive a higher CTC offer:
                </p>
                <ul className="text-sm text-gray-600 ml-4">
                  <li>• Must notify TPO via email same day expressing disinterest in PPO</li>
                  <li>• Failure to send email results in debarment from placement season</li>
                  <li>• Same rule applies to 11-month MTech internships</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                <h4 className="font-semibold text-red-800 mb-2">Professional Conduct</h4>
                <p className="text-red-700 text-sm">
                  Students found engaging in misconduct with company HR on social media during or after graduation 
                  will have their degree withheld for one year to prevent tarnishing MANIT's reputation.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Date of Joining (DOJ) Policy</h4>
                <p className="text-gray-700 text-sm">
                  For students with 6-month internships receiving FTE offers from other companies, 
                  DOJ must align with FTE offer. TPC will not facilitate DOJ change requests.
                </p>
              </div>
            </div>
          </div>

          {/* SPOC Responsibilities */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-teal-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">SPOC Person Responsibilities</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Primary Duties</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Complete company files within same week of recruitment</li>
                    <li>• Monitor PPO declarations and joining dates</li>
                    <li>• Track offer letter receipts by selected students</li>
                    <li>• Inform TPC of offer letter declines promptly</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Additional Responsibilities</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Prepare student notices well in advance</li>
                    <li>• Coordinate hospitality and transportation</li>
                    <li>• Use only official channels for company communication</li>
                    <li>• Must be from Students TPC Committee</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-red-50 p-3 rounded border-l-4 border-red-500">
                <p className="text-red-800 text-sm font-medium">
                  Personal email communication with company HRs is strictly prohibited.
                </p>
              </div>
            </div>
          </div>

          {/* General Rules */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-gray-800 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">General Rules</h2>
            </div>
            <div className="p-6 space-y-6">
              
              {/* Registration Rules */}
              <div>
                <h4 className="font-semibold text-[#002147] mb-3 text-lg">Registration</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-gray-500 pl-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>1. Genuine Registration Only:</strong> Register only if genuinely interested. 
                      Non-participation after registration leads to debarment from next 3 companies.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-500 pl-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>2. Withheld Results:</strong> Students with withheld results must mention "WH" or "Withheld" 
                      in CGPA sections. Violation leads to 3-month debarment.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-500 pl-4">
                    <p className="text-gray-700 text-sm">
                      <strong>3. Data Accuracy:</strong> 100% correct data required in registration forms. 
                      Discrepancies lead to 3-month debarment or complete process exclusion.
                    </p>
                  </div>
                </div>
              </div>

              {/* Selection Process */}
              <div>
                <h4 className="font-semibold text-[#002147] mb-3 text-lg">Selection Process</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-gray-700 text-sm">
                      <strong>4. PPT Attendance:</strong> Pre-Placement Talk attendance is compulsory. 
                      Doors close 5 minutes before PPT starts.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <p className="text-red-800 text-sm">
                      <strong>Non-Attendance Policy:</strong> Students must email tpwnitb@gmail.com before scheduled process 
                      if unable to attend. No prior notice leads to debarment from next 10 companies.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-gray-700 text-sm">
                      <strong>5. Interview Feedback:</strong> Mandatory feedback submission on interview day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Discipline Rules */}
              <div>
                <h4 className="font-semibold text-[#002147] mb-3 text-lg">Discipline</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <p className="text-red-800 text-sm mb-2">
                      <strong>6. Cheating:</strong> 3-month debarment for first offense. Permanent debarment for repeat offense.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <p className="text-red-800 text-sm mb-2">
                      <strong>7. Forgery/Wrong Information:</strong> Complete session debarment for deliberate forgery 
                      or sharing wrong information.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <p className="text-red-800 text-sm mb-2">
                      <strong>8. Misbehavior:</strong> Branch-wise debarment for misbehaving with HR/executives. 
                      Complete session debarment if student/guardian tries to influence HR.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <p className="text-red-800 text-sm mb-2">
                      <strong>9. Post-Placement Misconduct:</strong> Job cancellation and company notification for 
                      forgery or misconduct after placement.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <p className="text-red-800 text-sm">
                      <strong>10. Test Location:</strong> 3-month debarment for taking online tests from 
                      unauthorized locations.
                    </p>
                  </div>
                </div>
              </div>

              {/* PPO Rules */}
              <div>
                <h4 className="font-semibold text-[#002147] mb-3 text-lg">Pre-Placement Offers</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>11. PPO Contact Restriction:</strong> Complete campus selection debarment for contacting 
                      company executives regarding PPO cancellation.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="text-gray-700 text-sm">
                      <strong>12. Internship Participation:</strong> Students not interested in PPO must not 
                      participate in internship test procedure.
                    </p>
                  </div>
                </div>
              </div>

              {/* TPC Member Rules */}
              <div>
                <h4 className="font-semibold text-[#002147] mb-3 text-lg">TPC Member Regulations</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>13. Misconduct:</strong> Immediate removal from TPC for misinformation, forgery, 
                      or unlawful activities.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>14. Service Standards:</strong> Removal for not contributing services sincerely.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>15. Invigilation:</strong> No unauthorized invigilation duties. Violation leads to TPC removal.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-gray-700 text-sm">
                      <strong>16. Confidentiality:</strong> No sharing TPC information without TPO permission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Online Test Rules */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Online Test Rules</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Before Test</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Bring college ID cards (mandatory)</li>
                    <li>• No mobile phones or electronics allowed</li>
                    <li>• No entry after scheduled time</li>
                    <li>• Only authorized personnel for invigilation</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">During Test</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• No leaving hall during test</li>
                    <li>• Mandatory attendance register signing</li>
                    <li>• Write name and scholar number on rough sheets</li>
                    <li>• No snacks allowed in labs</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                  <p className="text-red-800 text-sm font-medium">
                    Any cheating during online tests leads to complete campus debarment as it affects institute reputation.
                  </p>
                </div>
                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                  <p className="text-yellow-800 text-sm">
                    Missing electronic accessories cost will be shared among all test participants within 2 days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Campus Drive Rules */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Virtual Campus Drive Rules</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Interview Process</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Online tests for candidate shortlisting</li>
                    <li>• Virtual interviews for shortlisted candidates</li>
                    <li>• Company-dependent interview rounds</li>
                    <li>• Results announced by T&P cell</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Technical Responsibilities</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• T&P cell not responsible for internet issues</li>
                    <li>• Students responsible for technical problems</li>
                    <li>• Contact faculty coordinators for queries</li>
                  </ul>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800 mb-2">New Debarment Rules</h4>
                <ul className="space-y-1 text-sm text-red-700">
                  <li>• Cheating in online test/virtual interview: 3-month debarment</li>
                  <li>• Participating without required pointer criteria: Debarment from next 3 companies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Revised Discipline Rules */}
          <div className="bg-white rounded-lg shadow-lg border border-red-200">
            <div className="bg-red-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Revised Placement Discipline Rules (July 15, 2025)</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-red-800 mb-1">1. Cheating = 3 Months Ban</h4>
                    <p className="text-sm text-gray-700">Any cheating (mobile, hotspot, software, impersonation, copying) leads to 3-month debarment. Repeat offense = permanent ban.</p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-orange-800 mb-1">2. Absence After Registration</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 1st time: 3 companies debarment</li>
                      <li>• 2nd time: 10 companies debarment</li>
                      <li>• 3rd time: Permanent removal</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800 mb-1">3. Prior Approval Needed</h4>
                    <p className="text-sm text-gray-700">Email faculty coordinators at least one day before for genuine reasons (health/accident). Allowed only once per semester.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-800 mb-1">4. Bags & Mobiles Prohibited</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• No bags inside labs</li>
                      <li>• Only one blank register allowed</li>
                      <li>• Transparent stationery box only</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-gray-500 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-1">5. Records Maintained</h4>
                    <p className="text-sm text-gray-700">Every violation recorded. Multiple offenses lead to stricter punishment.</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <h4 className="font-semibold text-red-800 mb-1">6. Zero Tolerance</h4>
                    <p className="text-sm text-red-700">No excuses entertained. Strict action without exception. Attendance in TPC registers compulsory.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
                <p className="text-center text-yellow-800 font-semibold">
                  Strict discipline is essential for better placements. All students advised to follow rules sincerely.
                </p>
              </div>
            </div>
          </div>

          {/* Guidelines for Students */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-cyan-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Guidelines for Students</h2>
            </div>
            <div className="p-6 space-y-6">
              
              {/* Motivational Posters */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-bold text-blue-800 mb-3 text-center">Discipline Defines Success</h4>
                  <p className="font-semibold text-blue-700 text-center mb-2">MANITians Set the Example!</p>
                  <div className="space-y-1 text-sm text-blue-700">
                    <p>✓ No cheating</p>
                    <p>✓ Be punctual</p>
                    <p>✓ Respect process</p>
                    <p>✓ Placement is a privilege</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-bold text-green-800 mb-3 text-center">MANIT Placement Mantra</h4>
                  <p className="font-semibold text-green-700 text-center mb-2">CRACK EVERY DRIVE!</p>
                  <div className="space-y-1 text-sm text-green-700">
                    <p>✓ Revise core</p>
                    <p>✓ Practice aptitude</p>
                    <p>✓ Mock interviews</p>
                    <p>✓ Communicate confidently</p>
                    <p>✓ Keep documents ready</p>
                  </div>
                </div>
              </div>

              {/* Recruitment Flow */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-3 text-center">Campus Recruitment Flow</h4>
                <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded">Registration</span>
                  <span className="text-purple-600">→</span>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded">Online Assessment</span>
                  <span className="text-purple-600">→</span>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded">GD</span>
                  <span className="text-purple-600">→</span>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded">Interview</span>
                  <span className="text-purple-600">→</span>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded">Offer Letter</span>
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div>
                <h4 className="font-semibold text-[#002147] mb-3 text-lg">Eligibility Criteria (Batch 2026-27)</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-cyan-500 pl-4 bg-cyan-50 p-3 rounded">
                    <p className="text-cyan-800 text-sm font-medium mb-2">
                      <strong>1. Attendance Requirement:</strong> Only students with 75% attendance will be allowed to appear in Campus Recruitment Process.
                    </p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4 bg-cyan-50 p-3 rounded">
                    <p className="text-cyan-800 text-sm font-medium mb-2">
                      <strong>2. Disciplinary Record:</strong> No proctorial record should exist for students attending the campus process.
                    </p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4 bg-cyan-50 p-3 rounded">
                    <p className="text-cyan-800 text-sm font-medium">
                      <strong>3. Academic Performance:</strong> Students with 6.5 CGPA and above aggregate marks will be allowed to attend the selection process.
                    </p>
                  </div>
                </div>
              </div>

              {/* Do's and Don'ts */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-800 mb-3">Recruitment Drive Do's</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Be on time (30 minutes prior to test)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Dress formally (Boys: full sleeve shirt, formal trousers & shoes; Girls: Formal dress only)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Carry updated resume and all documents
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Be polite and maintain discipline
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Attend all levels of selection process
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-bold text-red-800 mb-3">Recruitment Drive Don'ts</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      No casual dress allowed
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      No mobiles/electronic gadgets in interview/test hall
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      No group indiscipline or hooliganism
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      No direct interaction with company executives
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      No entry after test begins
                    </li>
                  </ul>
                </div>
              </div>

              {/* General Guidelines */}
              <div>
                <h4 className="font-semibold text-[#002147] mb-3 text-lg">General Guidelines</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-gray-500 pl-4">
                    <p className="text-gray-700 text-sm">
                      <strong>Dress Code:</strong> All students including volunteers must wear formals from PPT till end of selection process.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-500 pl-4">
                    <p className="text-gray-700 text-sm">
                      <strong>Mandatory Participation:</strong> Students clearing any level must appear for the next level.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-500 pl-4">
                    <p className="text-gray-700 text-sm">
                      <strong>ID Verification:</strong> Faculty coordinators will check ID cards before written tests. Only college ID accepted.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-500 pl-4">
                    <p className="text-gray-700 text-sm">
                      <strong>Invigilation:</strong> Faculty coordinators and company HR will jointly invigilate written tests.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <p className="text-red-800 text-sm font-medium">
                      <strong>Attendance Register:</strong> Signing attendance is compulsory. Student is responsible for the same, or test won't be accepted.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                    <p className="text-red-800 text-sm font-medium">
                      <strong>Institutional Image:</strong> Student behavior frames institute image. Misconduct leads to proctorial committee action.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Checklist */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-amber-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Document Checklist</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4 font-medium">Students must carry the following documents during campus placement:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 mb-3">Identity & Academic Documents</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">1.</span>
                      <span>College Identity Proof (Student ID card)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">2.</span>
                      <span>Alternate Identity Proof (Driving License, PAN, Voter ID, Aadhar, Passport)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">3.</span>
                      <span>Student CV (Curriculum Vitae)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">4.</span>
                      <span>Caste Certificate</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">5.</span>
                      <span>Passport size Photographs (Minimum two)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 mb-3">Academic & Achievement Records</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">6.</span>
                      <span>Mark sheets of 10th, 12th, and all semesters</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">7.</span>
                      <span>Certificates of Achievements</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">8.</span>
                      <span>Internship/Training Certificates</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">9.</span>
                      <span>Minor Project and Major Project reports</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-amber-50 p-3 rounded border-l-4 border-amber-500">
                <p className="text-amber-800 text-sm font-medium">
                  💡 <strong>Tip:</strong> Keep all documents organized in a folder and carry photocopies as backup.
                </p>
              </div>
            </div>
          </div>

          {/* TPC Student Committee Guidelines */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Guidelines for TPC Student Committee Team</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Student Council Membership</h4>
                  <p className="text-gray-700 text-sm">
                    TPC members are not allowed to be members of Student Council. If interested, 
                    prior permission from TPO required and resignation from current post must be submitted.
                  </p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                  <h4 className="font-semibold text-red-800 mb-1">Performance Standards</h4>
                  <p className="text-red-700 text-sm">
                    Students not working satisfactorily will be removed from team and information 
                    will be circulated to Head of Department.
                  </p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded">
                  <h4 className="font-semibold text-red-800 mb-1">Behavioral Standards</h4>
                  <p className="text-red-700 text-sm">
                    Students misbehaving with company executives will be removed from placement team 
                    and action will be taken to debar them from entire campus recruitment process.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#002147] text-white rounded-lg shadow-lg">
            <div className="px-6 py-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p className="text-lg">Training & Placement Cell</p>
                <p>Email: <span className="font-semibold">tpwnitb@gmail.com</span></p>
                <p>For queries, contact your respective faculty coordinators</p>
              </div>
              <div className="mt-6 text-sm opacity-90">
                <p>These policies are implemented to enhance placement opportunities and contribute to NIRF ranking.</p>
                <p className="mt-2">Last Updated: July 15, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}