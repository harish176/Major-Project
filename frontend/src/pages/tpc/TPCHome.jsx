import { motion } from "framer-motion";

export default function TPCHome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#002147] text-center mb-8">
        Training & Placement Cell
      </h1>

      <div className="max-w-6xl mx-auto">
        {/* TPO Message */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Header with TPO Info */}
          <div className="bg-[#002147] text-white px-6 py-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src="/tpc/Dr Aruna Saxena.png" 
                  alt="Prof. Aruna Saxena" 
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Message from TPO</h2>
                <h3 className="text-xl font-semibold">Prof. Aruna Saxena</h3>
                <p className="text-lg">Professor & Head</p>
                <p className="text-base">Training & Placement Cell</p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="px-6 py-8">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                I hope this letter finds you in good health and high spirits. As the head of the Training and Placement Cell of our esteemed institute, I wanted to address an important issue that concerns each one of you regarding the current job market situation. We anticipate a decrease in hiring activities across various industries, due to the ongoing recession thereby making the competition for placements more intense this season. Considering the challenges presented by the current situation, it is crucial for all of you to actively develop and enhance your skills during the ongoing summer break to maximize your chances of securing employment opportunities.
              </p>

              <p>
                The job market is ever-evolving and uncertainties prevail. Recruiters today are looking for candidates who possess a diverse range of skills that align with the requirements of the industry. By developing expertise in specific areas, you can differentiate yourself from other applicants and stand out in the competitive job market. In uncertain times like these, individuals with a growth mindset and a commitment to continuous learning are highly sought after by potential employers. By expanding your skill set, you open doors to new opportunities and career paths.
              </p>

              <p>
                The students who are targeting core industry roles, as well as IT/non-core roles must focus on developing skills relevant to their chosen fields. It is vital to focus on enhancing technical competencies related to your specific discipline. This may include learning new software tools, staying updated with industry standards and practices, and developing a strong foundation in theoretical concepts. In addition to technical skills, do not overlook the importance of soft skills, such as communication, teamwork, problem-solving, etc. These skills are highly valued by employers and play a crucial role in your overall development.
              </p>

              <p>
                For the students who are currently pursuing summer internships, you must focus on securing Pre-Placement Offers (PPO) given the existing economic conditions. It is important to understand the competitive nature of the job market that lies ahead. Therefore, it is essential for you to maximize your chances of securing a PPO and obtaining a job offer from your current internship organization. Showcase a strong work ethic, and dedication and consistently deliver high-quality results.
              </p>

              <p>
                I encourage you all to work hard, remain focused, and put in your utmost effort. Feel free to reach out to the Training and Placement Cell for guidance and support for your placement journey. I wish you the very best in your upcoming endeavors.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-[#002147] mb-4">Contact Information</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Prof. Aruna Saxena (TPO)</strong></p>
                  <p><strong>Prof. & Head</strong></p>
                  <p><strong>Training & Placement Cell</strong></p>
                  <p><strong>Mobile:</strong> +91 7898216935</p>
                  <p><strong>LinkedIn:</strong> Training Placement Cell</p>
                  <p><strong>Email:</strong> tpwnitb@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}