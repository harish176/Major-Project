import React from 'react';
import { motion } from 'framer-motion';
import { Download, Award } from 'lucide-react';

// --- Data for the Scholarships Page from the provided image ---
const scholarshipsData = [
    { title: 'Engineers India Limited Scholarship to SC & ST B.Tech Students', isNew: true, pdfUrl: '/pdfs/scholarship-engineers-india-ltd.pdf' },
    { title: 'Reliance India Scholarship for 1st Year PG students 2025 - 26', isNew: true, pdfUrl: '/pdfs/scholarship-reliance-india-pg.pdf' },
    { title: 'L.R.Mundra Memorial Scholarship- 2025-26 for PG/Phd', isNew: true, pdfUrl: '/pdfs/scholarship-lr-mundra-memorial.pdf' },
    { title: 'Important Notice for 1st Year U.G Students 2025-26', isNew: true, pdfUrl: '/pdfs/notice-ug-1st-year.pdf' },
    { title: 'Loan Scheme under Vidya Lakshmi', isNew: true, pdfUrl: '/pdfs/scholarship-vidya-lakshmi-loan.pdf' },
    { title: 'Samajik Nyay and Divyangjan Sskitkarn', isNew: true, pdfUrl: '/pdfs/scholarship-samajik-nyay.pdf' },
    { title: 'List of students applied for MMVY/MPTASS scholarship must submit the scholarship form to academic section', isNew: true, pdfUrl: '/pdfs/notice-mmvy-mptass-submission.pdf' },
    { title: 'Letter to 265 institutions regarding NSP portal opening for the Year 2025-26', isNew: true, pdfUrl: '/pdfs/notice-nsp-portal-opening.pdf' },
    { title: 'Publication of Advertisement – National Overseas Scholarship Scheme for ST Students (2025-26)', isNew: true, pdfUrl: '/pdfs/scholarship-national-overseas-st.pdf' },
    { title: 'D.O. letter dated 24.04.2025 requesting to give wider publicity to the NOS scheme guidelines in Institution-reg.', isNew: true, pdfUrl: '/pdfs/notice-nos-scheme-publicity.pdf' },
    { title: 'Undertaking for applying scholarship under all prevailing schemes', isNew: true, pdfUrl: '/pdfs/form-scholarship-undertaking.pdf' },
    { title: 'Financial Assistance from the Poor Student Fund.', isNew: true, pdfUrl: '/pdfs/info-poor-student-fund.pdf' },
    { title: 'Narotam Sekhsaria Foundation Post Graduate Scholarship 2025', isNew: true, pdfUrl: '/pdfs/scholarship-narotam-sekhsaria-pg.pdf' },
    { title: 'CSR initiative to help Economically Weaker Students by Metroo Waste Handling Pvt Ltd Delhi', isNew: true, pdfUrl: '/pdfs/scholarship-metroo-waste-ews.pdf' },
    { title: 'Narotham Sekhsaria Foundation Post Graduate Scholarship 2025: Applications Closing Soon', isNew: true, pdfUrl: '/pdfs/notice-narotham-sekhsaria-closing.pdf' },
    { title: 'Narotam Sekhsaria Foundation Post Graduate Scholarship 2025 Call for Application', isNew: true, pdfUrl: '/pdfs/notice-narotam-sekhsaria-application.pdf' },
    { title: 'Scholarship for Post-graduate/Ph.D./Postdoctoral Studies Overseas | J N Tata Endowment Loan Scholarship 2025-26', isNew: true, pdfUrl: '/pdfs/scholarship-jn-tata-overseas.pdf' },
    { title: 'Bhagwati jeewan social charitable society Scholarship for 2nd year student', isNew: true, pdfUrl: '/pdfs/scholarship-bhagwati-jeewan.pdf' },
    { title: 'Scholarship Scheme', isNew: true, pdfUrl: '/pdfs/scholarship-scheme-general.pdf' },
    { title: 'Short Term scholarship for Ph.D registered and recent post docs..', isNew: false, pdfUrl: '/pdfs/scholarship-phd-short-term.pdf' },
    { title: 'Withdrawal Undertaking for Scholarship', isNew: false, pdfUrl: '/pdfs/form-withdrawal-undertaking.pdf' },
    { title: 'All Students are informed that scholarship form must be submitted before 7 days of your scholarship closing date.', isNew: false, pdfUrl: '/pdfs/notice-scholarship-deadline.pdf' },
    { title: 'Implementation of Top Class College Education Scheme for OBC, EBC, DNT during the year 2022-23.', isNew: false, pdfUrl: '/pdfs/scholarship-top-class-obc-ebc.pdf' },
];


// --- Framer Motion Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

// --- Main Page Component ---
const MANITBhopalScholarshipsPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
                
                <motion.header 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-2">MANIT Bhopal</h1>
                    <p className="text-lg sm:text-xl text-gray-300">Scholarships & Financial Assistance</p>
                </motion.header>

                {/* Scholarships List Section */}
                <motion.section 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-800 rounded-xl shadow-2xl p-6"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-cyan-300 border-b-2 border-cyan-500 pb-2 flex items-center">
                        <Award className="mr-3"/> Available Scholarships
                    </h2>
                    <div className="flex flex-col space-y-3">
                        {scholarshipsData.map((scholarship, index) => (
                            <motion.a 
                                key={index}
                                href={scholarship.pdfUrl} 
                                download
                                variants={itemVariants}
                                className="group flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                            >
                                <span className="flex-grow pr-4">» {scholarship.title}</span>
                                <div className="flex items-center flex-shrink-0">
                                    {scholarship.isNew && (
                                        <span className="text-xs font-bold bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md mr-4 animate-pulse">
                                            NEW
                                        </span>
                                    )}
                                    <Download className="text-gray-400 group-hover:text-gray-900 transition-colors" size={20} />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default MANITBhopalScholarshipsPage;
