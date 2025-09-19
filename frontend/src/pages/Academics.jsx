import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md shadow-sm">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-[#002147] text-white px-4 py-2 font-semibold"
      >
        {title}
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white"
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-[#002147] text-white p-4 text-center text-xl font-bold">
        5 Years Dual Degree Program
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* First Year */}
        <Accordion title="First Year Scheme">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              First Year Scheme For B.Tech and Dual Degree (B.Tech and M.Tech in
              Mathematics and Data Science)
            </li>
            <li>
              5 Years Dual Degree Program B.Tech. and M.Tech. in Mathematics and
              Data Science
            </li>
          </ul>
        </Accordion>

        {/* UG Schemes */}
        <Accordion title="UG Schemes">
          <Accordion title="B Tech / B Arch / B Plan">
            <ul className="list-disc pl-6 space-y-2">
              <li>For Students admitted in 2016 to 2019</li>
              <li>
                Revised scheme (VII & VIII Sem only) for the Students Admitted in
                2019
              </li>
              <li>For Students admitted in 2020</li>
              <li>For Students admitted in 2021 Onwards</li>
              <li>For Students admitted after 2024</li>
            </ul>
          </Accordion>
        </Accordion>

        {/* PG Schemes */}
        <Accordion title="PG Schemes">
          <Accordion title="M.Tech / M.Plan">
            <ul className="list-disc pl-6 space-y-2">
              <li>For Students admitted in 2021 Onwards</li>
              <li>For Students admitted in 2022 Onwards</li>
            </ul>
          </Accordion>

          <Accordion title="Master of Computer Applications">
            <Accordion title="MCA">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  New Scheme (Admission Year 2020-21 Onwards) for Master of
                  Computer Applications
                </li>
              </ul>
            </Accordion>
          </Accordion>

          <Accordion title="Master of Business Administration">
            <Accordion title="MBA">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  New Scheme (Admission Year 2020-21 Onwards) for Master of
                  Business Administrations
                </li>
                <li>
                  New Scheme (Admission Year 2022 Onwards) for Master of Business
                  Administrations
                </li>
              </ul>
            </Accordion>
          </Accordion>

          <Accordion title="M.Sc.">
            <Accordion title="M.Sc.">
              <ul className="list-disc pl-6 space-y-2">
                <li>New Scheme for MSc (Session 2021-22 Onwards)</li>
                <li>New Scheme for MSc (Session 2022 Onwards)</li>
              </ul>
            </Accordion>
          </Accordion>
        </Accordion>
      </main>
    </div>
  );
}
