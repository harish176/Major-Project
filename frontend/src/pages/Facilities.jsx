import React, { useState } from "react";

export default function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showFullPage, setShowFullPage] = useState(false);
  const [selectedCCFSection, setSelectedCCFSection] = useState(null);

  const facilitiesData = [
    {
      id: 1,
      name: "Central Library",
      description:
        "Maulana Azad National Institute of Technology Bhopal, a premier institute of national importance, serves as a vital hub for academic and research activities, with an extensive collection of print and digital resources.",
      details:
        "The Central Library supports the multidisciplinary learning needs of the students, faculty members, and researchers, equipped with automated facilities, including a digital repository, e-learning platforms, and dedicated study zones. The library fosters an environment conducive to knowledge acquisition and innovation.",
      icon: "📚",
      color: "#1976d2",
      features: [
        "Online Resources",
        "Online Courses",
        "New Arrivals",
        "Central Library Circulars",
        "Special Books Display",
        "Library Events",
        "Hindi Books Collection",
        "Central Library Forms",
        "Library Bulletin",
        "Hindi Section (हिंदी खण्ड)",
        "Resource Guides",
      ],
      onlineResources: [
        {
          title: "QNOS! e-Journals",
          description:
            "Access to electronic journals and academic publications",
          icon: "📚",
          link: "#",
        },
        {
          title: "e-Books",
          description: "Digital collection of books and reference materials",
          icon: "📖",
          link: "#",
        },
        {
          title: "Database",
          description: "Research databases and academic resources",
          icon: "🗄️",
          link: "#",
        },
        {
          title: "Online Resources Procured",
          description: "Specially procured online academic resources",
          icon: "💻",
          link: "#",
        },
      ],
      libraryServices: [
        "Library eCatalogue",
        "Automated Circulation",
        "Digital Repository",
        "Research Support",
        "Reference Services",
        "New Arrivals",
        "Inter Library Loan (ILL)",
        "eResources Access Area",
        "Book Banks",
        "QR Codes",
        "Online Payment",
      ],
      collectionData: {
        physical: [
          { type: "Books", count: "155062" },
          { type: "General Book Bank", count: "7115" },
          { type: "SC/ST Book Bank", count: "21598" },
          { type: "Hindi Books", count: "5479" },
          { type: "Bound Volumes", count: "341" },
          { type: "Thesis/Dissertations", count: "1627" },
          { type: "Newspapers", count: "16" },
          { type: "Magazines", count: "8" },
        ],
        digital: [
          { type: "Lecture CDs", count: "2061" },
          { type: "Lecture Videos", count: "398" },
          { type: "eBooks", count: "6805" },
          { type: "eJournals", count: "4959" },
          { type: "Databases", count: "2" },
        ],
      },
      staff: [
        {
          name: "Dr. Venkata Rao Pokuri",
          position: "Librarian",
          email: "venkata[at]manit[dot]ac[dot]in",
          image:
            "https://via.placeholder.com/150x200/1976d2/white?text=Dr.+Venkata+Rao+Pokuri",
          responsibilities: [
            "Head of the Central Library, MANIT",
            "Develop/update library policies and procedures",
            "Coordination with the stakeholders to maximise the usage of the library resources and services",
            "Develop linkages with other libraries",
            "Capacity Building Programmes",
          ],
        },
        {
          name: "Mr. Pankaj Kumar Sharma",
          position: "Deputy Librarian",
          email: "pankajsharma[at]gmail[dot]com",
          image:
            "https://via.placeholder.com/150x200/7b1fa2/white?text=Mr.+Pankaj+Kumar+Sharma",
          responsibilities: [
            "Library Administration",
            "Acquisition & Technical Section",
            "Collection Development",
            "Library Facilities and Services",
          ],
        },
        {
          name: "Mr. Wasim Rahaman",
          position: "Assistant Librarian",
          email: "wasimr[dot]manit[dot]ac[dot]in",
          image:
            "https://via.placeholder.com/150x200/388e3c/white?text=Mr.+Wasim+Rahaman",
          responsibilities: [
            "Circulation Section",
            "Library Technology Applications",
            "Digital Resources & Digital Library Services",
            "Research Support",
            "Library Publications",
          ],
        },
      ],
      supportStaff: [
        {
          name: "Mr T P S Uikey",
          position: "Senior Superintendent",
          section: "Acquisition Section and Library Office",
        },
        {
          name: "Mr Mohammad Imran",
          position: "Senior Technician",
          section: "Circulation Section",
        },
        {
          name: "Mr. Dinesh Sahare",
          position: "Senior Technician",
          section: "Library Office and Book Bank",
        },
      ],
    },
    {
      id: 2,
      name: "Central Computing Facility (CCF)",
      description:
        "State-of-the-art computer laboratories equipped with latest hardware and software for programming, research, and academic work.",
      details:
        "The Central Computing Facility provides comprehensive computing infrastructure to support academic, research, and administrative activities of the institute. It offers high-performance computing resources, software applications, and technical support services.",
      icon: "💻",
      color: "#7b1fa2",
      ccfSections: [
        {
          title: "About CCF",
          description:
            "Learn about the Central Computing Facility, its mission, vision, and infrastructure",
          content: {
            overview:
              "MANIT Bhopal Central Computing Facility provides seamless gigabit network connectivity to the entire campus that connects all the Academic Departments, Hostels, Central Library, Administrative Departments, Teaching Blocks, Research Centres, Building Section and Residences with Tier-3 managed architecture. Internet access is provided by two dedicated Internet links of 1 Gbps.",
            infrastructure:
              "Institute's Central Computing Facility (CCF) is now equipped with smart racks having:",
            facilities: [
              "High-Performance Computing cluster (HPC)",
              "VMware Virtualization cluster",
              "NVIDIA DGX A100",
            ],
            hpcDetails: {
              title: "CCF-HPC:",
              description:
                "HPC has the ability to process data and perform complex calculations at high speeds for scientific research.",
              specs: [
                "HPC facility has a total of 400 CPU Cores comprised of 8 compute nodes and 2 GPU nodes that provide the performance of 25.6 TFLOPS and 29.8 TFLOPS Rpeak respectively.",
                "The upper memory limit of 1920 GB RAM along with a 120 TB SAS-based storage system.",
                "The nodes are connected with InfiniBand interconnect to support more tightly coupled parallel applications.",
              ],
            },
            virtualizationDetails: {
              title: "CCF-Virtualization:",
              description:
                "The Virtualization cluster will help to create and host new servers with the desired web services for the betterment of the Institute facilities.",
              specs: [
                "Virtualization Cluster is divided into categories i.e. Gold (4 Nodes) and a Silver (9 Nodes) clusters having Dual Intel Xeon gold 5220 (18 cores x2 i.e.Total cores 36, Memory 256 GB / node) with 2.20 GHz frequency and Dual Intel Xeon Silver 4214 (12 cores x2 i.e. Total 24 cores, Memory 192 GB / node) with 2.20 GHz frequency respectively.",
              ],
            },
            dgxDetails: {
              title: "CCF-DGX A100:",
              description:
                "Universal system for all kinds of AI workloads—from analytics to training to inference.",
              specs: [
                "Compute density of packing 5 petaFLOPS of AI performance or 10 petaOPS INT8 into a 6U form factor.",
                "GPUs: 8x NVIDIA A100 Tensor Core GPUs.",
                "GPU Memory: 40 GB x 8 i.e. 320 GB in total.",
                "System Memory: 1TB",
                "System Storage: OS: 2x 1.92TB M.2 NVME drives Internal Storage: 15TB (4x 3.84TB) U.2 NVME drives.",
              ],
            },
          },
          icon: "ℹ️",
        },
        {
          title: "Services",
          description:
            "Explore the various computing services and facilities offered by CCF",
          content: {
            servicesList: [
              "2 Gbps leased line for fast internet access.",
              "Email Facilities for Faculties, Students, and Staffs.",
              "Computation facilities",
              {
                title: "Management and Maintainance:",
                items: [
                  "Official MANIT Bhopal Website",
                  "Servers and Network Infrastructure",
                  "Computer Labs (200 Terminals)",
                  "Workstations (10 Terminals)",
                ],
              },
              "Providing technical assistance to the Academic and Administrative Staff of the Institute.",
              "Online Classes",
            ],
          },
          icon: "🛠️",
        },
        {
          title: "Forms",
          description: "Access various forms for CCF services and applications",
          content:
            "Download and submit forms for new user registration, software installation requests, server space allocation, email account creation, network connectivity requests, and other CCF-related services.",
          icon: "📋",
        },
        {
          title: "Policies",
          description:
            "Review the policies and guidelines for using CCF resources",
          content:
            "Understand the terms of use, acceptable usage policies, security guidelines, data backup policies, software licensing terms, and other regulations governing the use of CCF resources and services.",
          icon: "📜",
        },
        {
          title: "Labs",
          description:
            "Information about computer laboratories and their specifications",
          content: {
            aboutLabs: "CCF has populated 200 Desktop machines and 10 Performance grade Workstations in two separate labs with Windows OS. CCF provides a computer lab facility for UG and PG students based on the Windows platform with the required application software.",
            currentUsage: "Currently, the lab facility is used for programming-based classes and workshops. When classes/workshops are not scheduled, it is available to students for assignments and projects. The lab facility is also used for conducting academic and administrative exams.",
            note: "NOTE: Kindly provide the required softwares detail at least a week before while booking a slot.",
            labsInfo: [
              {
                sno: 1,
                lab: "TA-209",
                details: "96 Terminals (Windows 10)"
              },
              {
                sno: 2,
                lab: "TA-216",
                details: "102 Terminals (Windows 10)"
              },
              {
                sno: 3,
                lab: "TA-216",
                details: "10 Workstations (Windows 10)",
                note: "(Approval Required)"
              }
            ],
            slotsAvailability: {
              ta209: {
                title: "Slots Availability LAB TA-209 (Windows 10) 96 Terminals",
                schedule: {
                  Monday: {
                    "09:00AM-10:00AM": "Empty",
                    "10:00AM-11:00AM": "Empty",
                    "11:00AM-12:00PM": "Empty",
                    "12:00PM-01:00PM": "Empty",
                    "01:00PM-02:00PM": "CSE",
                    "02:00PM-03:00PM": "CSE",
                    "03:00PM-04:00PM": "CSE",
                    "04:00PM-05:00PM": "CSE"
                  },
                  Tuesday: {
                    "09:00AM-10:00AM": "CSE",
                    "10:00AM-11:00AM": "CSE",
                    "11:00AM-12:00PM": "CSE",
                    "12:00PM-01:00PM": "CSE",
                    "01:00PM-02:00PM": "CSE",
                    "02:00PM-03:00PM": "CSE",
                    "03:00PM-04:00PM": "CSE",
                    "04:00PM-05:00PM": "CSE"
                  },
                  Wednesday: {
                    "09:00AM-10:00AM": "Empty",
                    "10:00AM-11:00AM": "Empty",
                    "11:00AM-12:00PM": "Empty",
                    "12:00PM-01:00PM": "Empty",
                    "01:00PM-02:00PM": "Empty",
                    "02:00PM-03:00PM": "PHY",
                    "03:00PM-04:00PM": "PHY",
                    "04:00PM-05:00PM": "PHY"
                  },
                  Thursday: {
                    "09:00AM-10:00AM": "Empty",
                    "10:00AM-11:00AM": "Empty",
                    "11:00AM-12:00PM": "Empty",
                    "12:00PM-01:00PM": "Empty",
                    "01:00PM-02:00PM": "CSE",
                    "02:00PM-03:00PM": "CSE",
                    "03:00PM-04:00PM": "CSE",
                    "04:00PM-05:00PM": "CSE"
                  },
                  Friday: {
                    "09:00AM-10:00AM": "CSE",
                    "10:00AM-11:00AM": "CSE",
                    "11:00AM-12:00PM": "CSE",
                    "12:00PM-01:00PM": "CSE",
                    "01:00PM-02:00PM": "Empty",
                    "02:00PM-03:00PM": "Empty",
                    "03:00PM-04:00PM": "Empty",
                    "04:00PM-05:00PM": "Empty"
                  },
                  Saturday: {
                    "09:00AM-10:00AM": "Empty",
                    "10:00AM-11:00AM": "Empty",
                    "11:00AM-12:00PM": "Empty",
                    "12:00PM-01:00PM": "Empty",
                    "01:00PM-02:00PM": "Empty",
                    "02:00PM-03:00PM": "Empty",
                    "03:00PM-04:00PM": "Empty",
                    "04:00PM-05:00PM": "Empty"
                  }
                }
              },
              ta216_terminals: {
                title: "Slots Availability LAB TA-216 (Windows 10) 102 Terminals",
                schedule: {
                  Monday: {
                    "09:00AM-10:00AM": "MCA",
                    "10:00AM-11:00AM": "MCA",
                    "11:00AM-12:00PM": "MCA",
                    "12:00PM-01:00PM": "MCA",
                    "01:00PM-02:00PM": "Empty",
                    "02:00PM-03:00PM": "MCA",
                    "03:00PM-04:00PM": "MCA",
                    "04:00PM-05:00PM": "Empty"
                  },
                  Tuesday: {
                    "09:00AM-10:00AM": "MCA",
                    "10:00AM-11:00AM": "MCA",
                    "11:00AM-12:00PM": "MCA",
                    "12:00PM-01:00PM": "MCA",
                    "01:00PM-02:00PM": "Empty",
                    "02:00PM-03:00PM": "MCA",
                    "03:00PM-04:00PM": "MCA",
                    "04:00PM-05:00PM": "Empty"
                  },
                  Wednesday: {
                    "09:00AM-10:00AM": "MCA",
                    "10:00AM-11:00AM": "MCA",
                    "11:00AM-12:00PM": "MCA",
                    "12:00PM-01:00PM": "MCA",
                    "01:00PM-02:00PM": "Empty",
                    "02:00PM-03:00PM": "MCA",
                    "03:00PM-04:00PM": "MCA",
                    "04:00PM-05:00PM": "Empty"
                  },
                  Thursday: {
                    "09:00AM-10:00AM": "MCA",
                    "10:00AM-11:00AM": "MCA",
                    "11:00AM-12:00PM": "MCA",
                    "12:00PM-01:00PM": "MCA",
                    "01:00PM-02:00PM": "Empty",
                    "02:00PM-03:00PM": "MCA",
                    "03:00PM-04:00PM": "MCA",
                    "04:00PM-05:00PM": "Empty"
                  },
                  Friday: {
                    "09:00AM-10:00AM": "MCA",
                    "10:00AM-11:00AM": "MCA",
                    "11:00AM-12:00PM": "MCA",
                    "12:00PM-01:00PM": "MCA",
                    "01:00PM-02:00PM": "Empty",
                    "02:00PM-03:00PM": "MCA",
                    "03:00PM-04:00PM": "MCA",
                    "04:00PM-05:00PM": "Empty"
                  },
                  Saturday: {
                    "09:00AM-10:00AM": "Empty",
                    "10:00AM-11:00AM": "Empty",
                    "11:00AM-12:00PM": "Empty",
                    "12:00PM-01:00PM": "Empty",
                    "01:00PM-02:00PM": "Empty",
                    "02:00PM-03:00PM": "Empty",
                    "03:00PM-04:00PM": "Empty",
                    "04:00PM-05:00PM": "Empty"
                  }
                }
              }
            },
            bookingNote: "NOTE: Respective institute departments are requested to book the slots by sending request Notesheet to CCF for new academic session.",
            lastUpdate: "Last Update on 07-08-2025"
          },
          icon: "🔬",
        },
        {
          title: "Resources",
          description:
            "Access computing resources, software, and documentation",
          content: {
            hpcClusterResources: {
              title: "HPC Cluster Resources",
              computeNodes: {
                title: "Compute Nodes:",
                specs: [
                  "8 compute nodes (CPU) (Rpeak – 25.6 TFLOPS)",
                  "2 GPU compute nodes (Rpeak – 29.8 TFLOPS) 576 Tensor Cores per GPU",
                ],
              },
              dgxNvidiaA100: {
                title: "DGX NVIDIA A100:",
                specs: [
                  "Computing density of packing 5 petaFLOPS of AI performance or 10 petaOPS INT8 into a 6U form factor",
                  "GPUs: 8x NVIDIA A100 Tensor Core GPUs",
                  "CPUs: 432 Tensor Cores per GPU",
                  "GPU Memory: 40 GB x 8 i.e. 320 GB in total",
                  "System Memory: 1TB",
                  "System Storage: OS: 2x 1.92TB M.2 NVME drives Internal Storage: 15TB (4x 3.84TB) U.2 NVME drives",
                ],
              },
              totalResources: {
                cpu: "Total 656 CPU Cores (400 from Compute Nodes & 256 from NVIDIA A100 DGX Server)",
                ram: "Total 2920 GB Memory (1920 GB from all compute nodes and 1 TB from NVIDIA A100 DGX Server)",
                storage: "120 TB PFS storage (Parallel File system)",
              },
            },
            virtualizationClusterResources: {
              title: "Virtualization Cluster Resources",
              servers: [
                {
                  type: "Dell Server R-640 Gold Class Processor 4 Nodes (Cluster 1)",
                  details: "(Dual Intel Xeon gold 5220 (18 core, Total core 36), 2.20 GHz)",
                },
                {
                  type: "Dell Server R-640 Silver Class Processor 10 Nodes (Cluster 2)",
                  details: "(Dual Intel Xeon Silver 4214 (12 core Total 24 cores) 2.20 GHz)",
                },
              ],
              ram: [
                "Gold Class (256 GB x 4 = 1060 GB)",
                "Silver Class (192 GB x 10 = 1920 GB)",
              ],
              storage: [
                "Cluster Storage: Dell Storage SCv 3020 - (4TB x 21 = 84 TB)",
                "Tape Library: 12 TB x 2 Tapes = 24 TB",
              ],
            },
            softwares: {
              title: "Softwares",
              softwareList: [
                {
                  name: "ArcGIS [50 Licenses]",
                  contact: "Dr. S. K. Katiyar - Dept of Civil Engg",
                },
                {
                  name: "BricsCAD [52 Licenses]",
                  contact: "Dr. Surabhi Mehrotra - Dept of Arch & Plan",
                },
                {
                  name: "Flow3D [Floating Licenses]",
                  details: "(Valid upto 13th Dec 2024)",
                  contact: "Dr. Rutuja M Chavan - Dept. of Civil Engg",
                },
                {
                  name: "MATLAB R2017b [25 Licenses]",
                  details: "[Available on HPC] [For Personal Desktop - Departmental Approval Required]",
                },
                {
                  name: "MATLAB R2022b [30 Licenses]",
                  details: "[Available on HPC] [For Personal Desktop - Departmental Approval Required]",
                },
                {
                  name: "Ecognition [5 Licenses]",
                  contact: "Dr. Surabhi Mehrotra - Dept of Arch & Plan",
                },
                {
                  name: "Creo Parametric",
                  contact: "Dr. Akhilesh Soni - Dept. of Mechanical Engineering",
                },
                {
                  name: "Turnitin",
                  contact: "Dr. D P Singh - Dept. of Computer Science & Engineering",
                },
                {
                  name: "ANSYS 2023 R1 [25 Tasks]",
                  contact: "Dr. Priyanka Dhurvey - Dept. of Civil Engineering",
                },
                {
                  name: "CST Studio 2024 [25 Licenses]",
                  contact: "Dr. O. P. Meena - Dept. of ECE",
                },
                {
                  name: "Scilab [OpenSource]",
                },
                {
                  name: "Nvidia/Cuda Toolkit [CCF]",
                },
                {
                  name: "Quantum Espresso [OpenSource]",
                },
                {
                  name: "Gromacs 2021.3 and Gromacs 5.1.5 [OpenSource]",
                },
                {
                  name: "Openfoam9 [OpenSource]",
                },
                {
                  name: "Xcrysden-0.9.3",
                },
                {
                  name: "Jupyter Notebook.",
                },
                {
                  name: "Nvidia DGX Container Softwares - List",
                },
              ],
              downloadLink: "Download Softwares [Available on Intranet]",
            },
          },
          icon: "📚",
        },
        {
          title: "People",
          description: "Meet the CCF team and contact information",
          content:
            "Get to know the dedicated team members of the Central Computing Facility, their roles, responsibilities, and contact information for technical support and assistance.",
          icon: "👥",
        },
      ],
    },
    {
      id: 3,
      name: "Central Research Facility (CRF)",
      description:
        "Advanced research facility with modern equipment and laboratories for cutting-edge research and development projects.",
      details:
        "Equipped with specialized instruments, clean rooms, and collaborative spaces for interdisciplinary research.",
      icon: "🔬",
      color: "#388e3c",
    },
    {
      id: 4,
      name: "Dispensary",
      description:
        "On-campus medical facility providing comprehensive healthcare services, first aid, and emergency medical assistance to students and staff.",
      details:
        "The Institute provides its students and staff with a dispensary which is regulated by qualified medical professionals, available during college hours with emergency services and specialized visiting consultants.",
      icon: "🏥",
      color: "#d32f2f",
      dispensaryData: {
        overview: "The Institute provides its students and staff with a dispensary which is regulated by",
        seniorMedicalOfficer: {
          name: "Dr. Jyoti Lahri",
          qualification: "MBBS MS (Obst & gynae)",
          designation: "Senior Medical Officer",
          email: "drlahri[AT]manit.ac.in",
          mobile: "9826375158",
          image: "https://via.placeholder.com/150x200/d32f2f/white?text=Dr.+Jyoti+Lahri"
        },
        medicalOfficer: {
          name: "Dr. PANKAJ KUMAR SINGH",
          email: "pankajsingh574[AT]gmail.com",
          mobile: "8770705825",
          image: "https://via.placeholder.com/150x200/d32f2f/white?text=Dr.+Pankaj+Singh"
        },
        medicalInCharge: [
          {
            name: "Dr. Jyoti Lahri",
            qualification: "MBBS MS (Obst & gynae)",
            designation: "Senior Medical Officer",
            mobile: "9826375158"
          },
          {
            name: "Dr. Pankaj Kumar Singh",
            designation: "Medical Officer",
            mobile: "8770705825"
          }
        ],
        visitingConsultants: [
          {
            name: "Dr. Apoorv Jain",
            specialization: "Skin Specialist",
            qualification: "M.D. Derma, MBBS",
            schedule: "Thursday & Saturday Morning 9. am to 11. am"
          },
          {
            name: "Dr. Bharti Soni",
            specialization: "MBBS, M.S. Ophthalmology",
            schedule: "Wednesday & Saturday Evening 5. pm to 7. pm"
          },
          {
            name: "Dr. Deepali Joshi",
            specialization: "Dentist",
            schedule: "Tuesday & Friday Evening 5. pm to 7. pm"
          }
        ],
        professionalCounsellor: "Professional Counsellor at MANIT",
        ambulance: {
          title: "Ambulance",
          contact: "7869301950",
          timing: {
            availability: "All days open including Saturday & Sunday (Except National Holidays)",
            morning: "Morning 8.30 to 12.30",
            evening: "Evening 4.30 to 7 pm"
          },
          facilities: [
            "Outdoor medical facilities.",
            "Dressing and injectable facilities.",
            "Distribution of free medicine for routine general problems.",
            "Nebulization ECG",
            "Institute Ambulance for Medical emergencies"
          ],
          rules: "As per swami medical attendance rules",
          downloadForm: "Here"
        },
        notices: [
          "Medical Facility Provided by the Institution",
          "Processing of medical reimbursement claim"
        ]
      }
    },
    {
      id: 5,
      name: "Guest House",
      description:
        "Comfortable accommodation facility for visiting faculty, researchers, and guests of the institution.",
      details:
        "Well-furnished rooms with modern amenities, dining facilities, and conference rooms for visitors.",
      icon: "🏨",
      color: "#f57c00",
    },
    {
      id: 6,
      name: "Physical Education",
      description:
        "Comprehensive sports and fitness facilities including gymnasium, outdoor courts, and fitness equipment.",
      details:
        "Indoor and outdoor sports facilities, fitness center, swimming pool, and professional coaching staff.",
      icon: "🏃‍♂️",
      color: "#303f9f",
    },
    {
      id: 7,
      name: "Auditorium",
      description:
        "Modern auditorium with seating capacity of 800, equipped with advanced audio-visual systems for events and seminars.",
      details:
        "Air-conditioned hall with state-of-the-art sound system, projection facilities, and lighting for various events.",
      icon: "🎭",
      color: "#8e24aa",
    },
    {
      id: 8,
      name: "Hostels",
      description:
        "On-campus residential facilities providing safe and comfortable accommodation for students with all basic amenities.",
      details:
        "Separate hostels for boys and girls with mess facilities, Wi-Fi, recreational areas, and 24/7 security.",
      icon: "🏠",
      color: "#0097a7",
    },
    {
      id: 9,
      name: "Bank and ATM",
      description:
        "On-campus banking services and ATM facilities for the convenience of students, faculty, and staff.",
      details:
        "Full-service bank branch with ATM machines, providing all banking services within the campus.",
      icon: "🏦",
      color: "#558b2f",
    },
    {
      id: 10,
      name: "Post Office",
      description:
        "Campus post office providing postal services, courier facilities, and mail handling for the college community.",
      details:
        "Complete postal services including speed post, registered mail, and parcel services.",
      icon: "📮",
      color: "#f9a825",
    },
    {
      id: 11,
      name: "Electrical Maintenance",
      description:
        "Dedicated electrical maintenance facility ensuring uninterrupted power supply and electrical safety across the campus.",
      details:
        "24/7 electrical support with backup generators, maintenance team, and emergency response services.",
      icon: "⚡",
      color: "#ff5722",
    },
    {
      id: 12,
      name: "ROLTA Incubation Centre",
      description:
        "Innovation and incubation center supporting entrepreneurship and startup development among students and faculty.",
      details:
        "Provides mentorship, funding support, workspace, and resources for budding entrepreneurs and innovative projects.",
      icon: "🚀",
      color: "#e91e63",
    },
    {
      id: 13,
      name: "Vehicle Section",
      description:
        "Campus transportation services and vehicle parking facilities for students, faculty, and visitors.",
      details:
        "Bus services, parking areas, vehicle maintenance, and transportation coordination for college activities.",
      icon: "🚌",
      color: "#795548",
    },
  ];

  const handleFacilityClick = (facility) => {
    if (facility.id === 1 || facility.id === 2 || facility.id === 4) {
      setShowFullPage(true);
      setSelectedFacility(facility);
      setSelectedCCFSection(null);
    } else {
      setSelectedFacility(
        selectedFacility?.id === facility.id ? null : facility
      );
    }
  };

  const handleCCFSectionClick = (section) => {
    setSelectedCCFSection(section);
  };

  const handleBackToFacilities = () => {
    setShowFullPage(false);
    setSelectedFacility(null);
    setSelectedCCFSection(null);
  };

  const handleBackToCCF = () => {
    setSelectedCCFSection(null);
  };

  // Individual CCF Section Page
  if (selectedCCFSection) {
    return (
      <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
        <button
          onClick={handleBackToCCF}
          style={{
            backgroundColor: "#7b1fa2",
            color: "white",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "2rem",
            fontSize: "1rem",
          }}
        >
          ← Back to CCF
        </button>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
            }}
          >
            {selectedCCFSection.icon}
          </div>
          <h1
            style={{
              color: "#7b1fa2",
              fontSize: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            {selectedCCFSection.title}
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              lineHeight: "1.8",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {selectedCCFSection.description}
          </p>
        </div>

        {/* Content based on section type */}
        {selectedCCFSection.title === "About CCF" && (
          <div>
            {/* Overview Section */}
            <div
              style={{
                marginBottom: "2rem",
                padding: "2rem",
                backgroundColor: "#f8f9fa",
                borderRadius: "10px",
              }}
            >
              <p
                style={{
                  color: "#444",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  textAlign: "center",
                }}
              >
                {selectedCCFSection.content.overview}
              </p>
            </div>

            {/* Infrastructure Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  color: "#7b1fa2",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
              >
                {selectedCCFSection.content.infrastructure}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {selectedCCFSection.content.facilities.map(
                  (facility, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        textAlign: "center",
                        border: "2px solid #7b1fa2",
                      }}
                    >
                      <h3 style={{ color: "#7b1fa2", marginBottom: "0.5rem" }}>
                        {facility}
                      </h3>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* HPC Details */}
            <div style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  color: "#7b1fa2",
                  marginBottom: "1rem",
                }}
              >
                {selectedCCFSection.content.hpcDetails.title}
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  marginBottom: "1rem",
                }}
              >
                {selectedCCFSection.content.hpcDetails.description}
              </p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                {selectedCCFSection.content.hpcDetails.specs.map(
                  (spec, index) => (
                    <li
                      key={index}
                      style={{
                        color: "#444",
                        marginBottom: "0.5rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {spec}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Virtualization Details */}
            <div style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  color: "#7b1fa2",
                  marginBottom: "1rem",
                }}
              >
                {selectedCCFSection.content.virtualizationDetails.title}
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  marginBottom: "1rem",
                }}
              >
                {selectedCCFSection.content.virtualizationDetails.description}
              </p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                {selectedCCFSection.content.virtualizationDetails.specs.map(
                  (spec, index) => (
                    <li
                      key={index}
                      style={{
                        color: "#444",
                        marginBottom: "0.5rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {spec}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* DGX Details */}
            <div>
              <h2
                style={{
                  color: "#7b1fa2",
                  marginBottom: "1rem",
                }}
              >
                {selectedCCFSection.content.dgxDetails.title}
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  marginBottom: "1rem",
                }}
              >
                {selectedCCFSection.content.dgxDetails.description}
              </p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                {selectedCCFSection.content.dgxDetails.specs.map(
                  (spec, index) => (
                    <li
                      key={index}
                      style={{
                        color: "#444",
                        marginBottom: "0.5rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {spec}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}

        {selectedCCFSection.title === "Services" && (
          <div>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "2rem",
                borderRadius: "10px",
              }}
            >
              <ul style={{ paddingLeft: "1.5rem", lineHeight: "2" }}>
                {selectedCCFSection.content.servicesList.map((service, index) => (
                  <li key={index} style={{ marginBottom: "1rem" }}>
                    {typeof service === "string" ? (
                      <span style={{ color: "#444", fontSize: "1.1rem" }}>
                        {service}
                      </span>
                    ) : (
                      <div>
                        <span
                          style={{
                            color: "#7b1fa2",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                          }}
                        >
                          {service.title}
                        </span>
                        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                          {service.items.map((item, idx) => (
                            <li
                              key={idx}
                              style={{ color: "#666", marginBottom: "0.3rem" }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {selectedCCFSection.title === "Labs" && (
          <div>
            {/* Labs Overview */}
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "2rem",
                borderRadius: "10px",
                marginBottom: "3rem",
              }}
            >
              <p
                style={{
                  color: "#444",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  marginBottom: "1.5rem",
                }}
              >
                {selectedCCFSection.content.aboutLabs}
              </p>
              <p
                style={{
                  color: "#666",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                }}
              >
                {selectedCCFSection.content.currentUsage}
              </p>
              <div
                style={{
                  backgroundColor: "#fff3cd",
                  border: "1px solid #ffeaa7",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p style={{ color: "#856404", fontSize: "1rem", margin: 0 }}>
                  <strong>Note:</strong> {selectedCCFSection.content.note}
                </p>
              </div>
            </div>

            {/* Labs Information Table */}
            <div style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  color: "#7b1fa2",
                  marginBottom: "1.5rem",
                  fontSize: "1.8rem",
                }}
              >
                Lab Facilities
              </h2>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#7b1fa2",
                    color: "white",
                    padding: "1rem",
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 2fr 1fr",
                    gap: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  <div>S.No.</div>
                  <div>Lab</div>
                  <div>Details</div>
                  <div>Note</div>
                </div>
                {selectedCCFSection.content.labsInfo.map((lab, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "1rem",
                      display: "grid",
                      gridTemplateColumns: "80px 1fr 2fr 1fr",
                      gap: "1rem",
                      borderBottom: index < selectedCCFSection.content.labsInfo.length - 1 ? "1px solid #eee" : "none",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ color: "#666" }}>{lab.sno}</div>
                    <div style={{ color: "#444", fontWeight: "bold" }}>{lab.lab}</div>
                    <div style={{ color: "#444" }}>{lab.details}</div>
                    <div style={{ color: "#d32f2f", fontSize: "0.9rem" }}>
                      {lab.note || ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Tables */}
            <div style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  color: "#7b1fa2",
                  marginBottom: "2rem",
                  fontSize: "1.8rem",
                }}
              >
                Lab Schedules
              </h2>
              
              {/* TA-209 Schedule */}
              <div style={{ marginBottom: "3rem" }}>
                <h3
                  style={{
                    color: "#333",
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  {selectedCCFSection.content.slotsAvailability.ta209.title}
                </h3>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#4a73b8",
                      color: "white",
                      padding: "0.8rem",
                      display: "grid",
                      gridTemplateColumns: "120px repeat(8, 1fr)",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    <div>Day/Time</div>
                    <div>9-10 AM</div>
                    <div>10-11 AM</div>
                    <div>11-12 PM</div>
                    <div>12-1 PM</div>
                    <div>1-2 PM</div>
                    <div>2-3 PM</div>
                    <div>3-4 PM</div>
                    <div>4-5 PM</div>
                  </div>
                  {Object.entries(selectedCCFSection.content.slotsAvailability.ta209.schedule).map(([day, slots]) => (
                    <div
                      key={day}
                      style={{
                        padding: "0.8rem",
                        display: "grid",
                        gridTemplateColumns: "120px repeat(8, 1fr)",
                        gap: "0.5rem",
                        borderBottom: "1px solid #eee",
                        fontSize: "0.85rem",
                      }}
                    >
                      <div style={{ fontWeight: "bold", color: "#333" }}>{day}</div>
                      {Object.values(slots).map((slot, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: "0.3rem",
                            borderRadius: "4px",
                            textAlign: "center",
                            backgroundColor: slot === "Empty" ? "#e8f5e8" : "#ffe6e6",
                            color: slot === "Empty" ? "#388e3c" : "#d32f2f",
                            fontSize: "0.8rem",
                          }}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* TA-216 Schedule */}
              <div style={{ marginBottom: "3rem" }}>
                <h3
                  style={{
                    color: "#333",
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  {selectedCCFSection.content.slotsAvailability.ta216_terminals.title}
                </h3>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#4a73b8",
                      color: "white",
                      padding: "0.8rem",
                      display: "grid",
                      gridTemplateColumns: "120px repeat(8, 1fr)",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    <div>Day/Time</div>
                    <div>9-10 AM</div>
                    <div>10-11 AM</div>
                    <div>11-12 PM</div>
                    <div>12-1 PM</div>
                    <div>1-2 PM</div>
                    <div>2-3 PM</div>
                    <div>3-4 PM</div>
                    <div>4-5 PM</div>
                  </div>
                  {Object.entries(selectedCCFSection.content.slotsAvailability.ta216_terminals.schedule).map(([day, slots]) => (
                    <div
                      key={day}
                      style={{
                        padding: "0.8rem",
                        display: "grid",
                        gridTemplateColumns: "120px repeat(8, 1fr)",
                        gap: "0.5rem",
                        borderBottom: "1px solid #eee",
                        fontSize: "0.85rem",
                      }}
                    >
                      <div style={{ fontWeight: "bold", color: "#333" }}>{day}</div>
                      {Object.values(slots).map((slot, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: "0.3rem",
                            borderRadius: "4px",
                            textAlign: "center",
                            backgroundColor: slot === "Empty" ? "#e8f5e8" : "#ffe6e6",
                            color: slot === "Empty" ? "#388e3c" : "#d32f2f",
                            fontSize: "0.8rem",
                          }}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div
              style={{
                backgroundColor: "#fff3cd",
                border: "1px solid #ffeaa7",
                borderRadius: "8px",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <p style={{ color: "#856404", fontSize: "1rem", marginBottom: "1rem" }}>
                <strong>Booking Note:</strong> {selectedCCFSection.content.bookingNote}
              </p>
              <p style={{ color: "#666", fontSize: "0.9rem", margin: 0 }}>
                {selectedCCFSection.content.lastUpdate}
              </p>
            </div>
          </div>
        )}

        {selectedCCFSection.title === "Resources" && (
          <div>
            {/* Resources Header */}
            <div
              style={{
                backgroundColor: "#4a73b8",
                color: "white",
                padding: "1.5rem",
                textAlign: "center",
                marginBottom: "2rem",
                fontSize: "2rem",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
            >
              Resources
            </div>

            {/* HPC Cluster Resources */}
            <div style={{ marginBottom: "3rem" }}>
              <div
                style={{
                  backgroundColor: "#4a73b8",
                  color: "white",
                  padding: "1rem",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                HPC Cluster Resources
              </div>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "2rem", borderRadius: "0 0 10px 10px" }}>
                {/* Compute Nodes */}
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ color: "#7b1fa2", marginBottom: "1rem" }}>
                    {selectedCCFSection.content.hpcClusterResources.computeNodes.title}
                  </h3>
                  <ul style={{ paddingLeft: "1.5rem" }}>
                    {selectedCCFSection.content.hpcClusterResources.computeNodes.specs.map((spec, idx) => (
                      <li key={idx} style={{ color: "#444", marginBottom: "0.5rem", lineHeight: "1.6" }}>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DGX NVIDIA A100 */}
                <div style={{ marginBottom: "2rem", padding: "1.5rem", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
                  <h3 style={{ color: "#f57c00", marginBottom: "1rem" }}>
                    {selectedCCFSection.content.hpcClusterResources.dgxNvidiaA100.title}
                  </h3>
                  <ul style={{ paddingLeft: "1.5rem" }}>
                    {selectedCCFSection.content.hpcClusterResources.dgxNvidiaA100.specs.map((spec, idx) => (
                      <li key={idx} style={{ color: "#444", marginBottom: "0.5rem", lineHeight: "1.6" }}>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total Resources Summary */}
                <div style={{ padding: "1.5rem", backgroundColor: "#e8f5e8", borderRadius: "8px" }}>
                  <h3 style={{ color: "#388e3c", marginBottom: "1rem" }}>Total Resources Summary:</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.8rem" }}>
                    <div style={{ padding: "0.8rem", backgroundColor: "white", borderRadius: "5px", border: "1px solid #ddd" }}>
                      <strong style={{ color: "#7b1fa2" }}>CPU: </strong>
                      <span style={{ color: "#444" }}>{selectedCCFSection.content.hpcClusterResources.totalResources.cpu}</span>
                    </div>
                    <div style={{ padding: "0.8rem", backgroundColor: "white", borderRadius: "5px", border: "1px solid #ddd" }}>
                      <strong style={{ color: "#7b1fa2" }}>RAM: </strong>
                      <span style={{ color: "#444" }}>{selectedCCFSection.content.hpcClusterResources.totalResources.ram}</span>
                    </div>
                    <div style={{ padding: "0.8rem", backgroundColor: "white", borderRadius: "5px", border: "1px solid #ddd" }}>
                      <strong style={{ color: "#7b1fa2" }}>Storage: </strong>
                      <span style={{ color: "#444" }}>{selectedCCFSection.content.hpcClusterResources.totalResources.storage}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Virtualization Cluster Resources */}
            <div style={{ marginBottom: "3rem" }}>
              <div
                style={{
                  backgroundColor: "#4a73b8",
                  color: "white",
                  padding: "1rem",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                Virtualization Cluster Resources
              </div>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "2rem", borderRadius: "0 0 10px 10px" }}>
                {/* Servers */}
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ color: "#7b1fa2", marginBottom: "1rem" }}>Servers:</h3>
                  {selectedCCFSection.content.virtualizationClusterResources.servers.map((server, idx) => (
                    <div key={idx} style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "white", borderRadius: "5px", border: "1px solid #ddd" }}>
                      <div style={{ fontWeight: "bold", color: "#333", marginBottom: "0.5rem" }}>{server.type}</div>
                      <div style={{ color: "#666", fontSize: "0.9rem" }}>{server.details}</div>
                    </div>
                  ))}
                </div>

                {/* RAM */}
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ color: "#7b1fa2", marginBottom: "1rem" }}>RAM:</h3>
                  <ol style={{ paddingLeft: "1.5rem" }}>
                    {selectedCCFSection.content.virtualizationClusterResources.ram.map((ram, idx) => (
                      <li key={idx} style={{ color: "#444", marginBottom: "0.5rem", lineHeight: "1.6" }}>
                        {ram}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Storage */}
                <div>
                  <h3 style={{ color: "#7b1fa2", marginBottom: "1rem" }}>Storage:</h3>
                  <ol style={{ paddingLeft: "1.5rem" }}>
                    {selectedCCFSection.content.virtualizationClusterResources.storage.map((storage, idx) => (
                      <li key={idx} style={{ color: "#444", marginBottom: "0.5rem", lineHeight: "1.6" }}>
                        {storage}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Softwares */}
            <div>
              <div
                style={{
                  backgroundColor: "#4a73b8",
                  color: "white",
                  padding: "1rem",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                Softwares
              </div>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "2rem", borderRadius: "0 0 10px 10px" }}>
                <ol style={{ paddingLeft: "1.5rem" }}>
                  {selectedCCFSection.content.softwares.softwareList.map((software, idx) => (
                    <li key={idx} style={{ marginBottom: "1rem", color: "#444", lineHeight: "1.6" }}>
                      <div>
                        <strong style={{ color: "#7b1fa2" }}>{software.name}</strong>
                        {software.details && (
                          <span style={{ color: "#666", marginLeft: "0.5rem" }}>{software.details}</span>
                        )}
                      </div>
                      {software.contact && (
                        <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.2rem" }}>
                          Contact Person: {software.contact}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
                
                {/* Download Link */}
                <div style={{ 
                  marginTop: "2rem", 
                  padding: "1rem", 
                  backgroundColor: "#e3f2fd", 
                  borderRadius: "5px",
                  textAlign: "center"
                }}>
                  <a 
                    href="#" 
                    style={{ 
                      color: "#1976d2", 
                      textDecoration: "none", 
                      fontSize: "1rem",
                      fontWeight: "bold"
                    }}
                  >
                    📥 {selectedCCFSection.content.softwares.downloadLink}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {(selectedCCFSection.title === "Forms" || selectedCCFSection.title === "Policies" || selectedCCFSection.title === "People") && (
          <div>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "3rem",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1rem",
                  opacity: "0.5",
                }}
              >
                🚧
              </div>
              <h3 style={{ color: "#666", marginBottom: "1rem" }}>
                Content Coming Soon
              </h3>
              <p style={{ color: "#888" }}>
                {selectedCCFSection.content}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full Page Render for specific facilities (Central Library, CCF, Dispensary)
  if (showFullPage && selectedFacility) {
    if (selectedFacility.id === 1) {
      // Central Library Full Page
      return (
        <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
          <button
            onClick={handleBackToFacilities}
            style={{
              backgroundColor: selectedFacility.color,
              color: "white",
              border: "none",
              padding: "0.8rem 1.5rem",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "2rem",
              fontSize: "1rem",
            }}
          >
            ← Back to Facilities
          </button>

          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
              {selectedFacility.icon}
            </div>
            <h1
              style={{
                color: selectedFacility.color,
                fontSize: "2.5rem",
                marginBottom: "1rem",
              }}
            >
              {selectedFacility.name}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                lineHeight: "1.8",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {selectedFacility.details}
            </p>
          </div>

          {/* Library Features Grid */}
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                color: selectedFacility.color,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Library Features
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
              }}
            >
              {selectedFacility.features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1rem",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    border: `2px solid ${selectedFacility.color}`,
                  }}
                >
                  <h3 style={{ color: selectedFacility.color, margin: 0 }}>
                    {feature}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Online Resources */}
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                color: selectedFacility.color,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Online Resources
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {selectedFacility.onlineResources.map((resource, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    border: `1px solid ${selectedFacility.color}20`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {resource.icon}
                  </div>
                  <h3
                    style={{
                      color: selectedFacility.color,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {resource.title}
                  </h3>
                  <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    {resource.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Collection Statistics */}
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                color: selectedFacility.color,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Collection Statistics
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
              }}
            >
              {/* Physical Collection */}
              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                }}
              >
                <h3
                  style={{
                    color: selectedFacility.color,
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  Physical Collection
                </h3>
                {selectedFacility.collectionData.physical.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.5rem 0",
                      borderBottom:
                        index <
                        selectedFacility.collectionData.physical.length - 1
                          ? "1px solid #ddd"
                          : "none",
                    }}
                  >
                    <span style={{ color: "#444" }}>{item.type}</span>
                    <span
                      style={{
                        color: selectedFacility.color,
                        fontWeight: "bold",
                      }}
                    >
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Digital Collection */}
              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                }}
              >
                <h3
                  style={{
                    color: selectedFacility.color,
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  Digital Collection
                </h3>
                {selectedFacility.collectionData.digital.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.5rem 0",
                      borderBottom:
                        index <
                        selectedFacility.collectionData.digital.length - 1
                          ? "1px solid #ddd"
                          : "none",
                    }}
                  >
                    <span style={{ color: "#444" }}>{item.type}</span>
                    <span
                      style={{
                        color: selectedFacility.color,
                        fontWeight: "bold",
                      }}
                    >
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Library Staff */}
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                color: selectedFacility.color,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Library Staff
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "2rem",
              }}
            >
              {selectedFacility.staff.map((member, index) => (
                <div
                  key={index}
                  style={{
                    padding: "2rem",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    border: `2px solid ${selectedFacility.color}20`,
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "120px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "1rem",
                    }}
                  />
                  <h3
                    style={{
                      color: selectedFacility.color,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {member.position}
                  </p>
                  <p style={{ color: "#888", fontSize: "0.9rem" }}>
                    {member.email}
                  </p>
                  <div style={{ marginTop: "1rem" }}>
                    <h4
                      style={{
                        color: selectedFacility.color,
                        fontSize: "1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Responsibilities:
                    </h4>
                    <ul
                      style={{
                        textAlign: "left",
                        fontSize: "0.9rem",
                        color: "#666",
                        paddingLeft: "1rem",
                      }}
                    >
                      {member.responsibilities.map((responsibility, idx) => (
                        <li key={idx} style={{ marginBottom: "0.3rem" }}>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Staff */}
          <div>
            <h2
              style={{
                color: selectedFacility.color,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Support Staff
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {selectedFacility.supportStaff.map((member, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "10px",
                    textAlign: "center",
                    border: `1px solid ${selectedFacility.color}30`,
                  }}
                >
                  <h3
                    style={{
                      color: selectedFacility.color,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {member.position}
                  </p>
                  <p style={{ color: "#888", fontSize: "0.9rem" }}>
                    {member.section}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (selectedFacility.id === 2) {
      // CCF Full Page
      return (
        <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
          <button
            onClick={handleBackToFacilities}
            style={{
              backgroundColor: selectedFacility.color,
              color: "white",
              border: "none",
              padding: "0.8rem 1.5rem",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "2rem",
              fontSize: "1rem",
            }}
          >
            ← Back to Facilities
          </button>

          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
              {selectedFacility.icon}
            </div>
            <h1
              style={{
                color: selectedFacility.color,
                fontSize: "2.5rem",
                marginBottom: "1rem",
              }}
            >
              {selectedFacility.name}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                lineHeight: "1.8",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {selectedFacility.details}
            </p>
          </div>

          {/* CCF Sections Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {selectedFacility.ccfSections.map((section, index) => (
              <div
                key={index}
                onClick={() => handleCCFSectionClick(section)}
                style={{
                  padding: "2rem",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  textAlign: "center",
                  border: `2px solid ${selectedFacility.color}20`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.boxShadow = "0 8px 15px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "1rem",
                  }}
                >
                  {section.icon}
                </div>
                <h3
                  style={{
                    color: selectedFacility.color,
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  {section.title}
                </h3>
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                  }}
                >
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (selectedFacility.id === 4) {
      // Dispensary Full Page
      return (
        <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
          <button
            onClick={handleBackToFacilities}
            style={{
              backgroundColor: selectedFacility.color,
              color: "white",
              border: "none",
              padding: "0.8rem 1.5rem",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "2rem",
              fontSize: "1rem",
            }}
          >
            ← Back to Facilities
          </button>

          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
              {selectedFacility.icon}
            </div>
            <h1
              style={{
                color: selectedFacility.color,
                fontSize: "2.5rem",
                marginBottom: "1rem",
              }}
            >
              {selectedFacility.name}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                lineHeight: "1.8",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {selectedFacility.details}
            </p>
          </div>

          {/* Medical Officers */}
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                color: selectedFacility.color,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Medical Officers
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "2rem",
              }}
            >
              {/* Senior Medical Officer */}
              <div
                style={{
                  padding: "2rem",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  border: `2px solid ${selectedFacility.color}20`,
                }}
              >
                <img
                  src={selectedFacility.dispensaryData.seniorMedicalOfficer.image}
                  alt={selectedFacility.dispensaryData.seniorMedicalOfficer.name}
                  style={{
                    width: "120px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                  }}
                />
                <h3
                  style={{
                    color: selectedFacility.color,
                    marginBottom: "0.5rem",
                  }}
                >
                  {selectedFacility.dispensaryData.seniorMedicalOfficer.name}
                </h3>
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {selectedFacility.dispensaryData.seniorMedicalOfficer.qualification}
                </p>
                <p
                  style={{
                    color: "#666",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  {selectedFacility.dispensaryData.seniorMedicalOfficer.designation}
                </p>
                <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                  📧 {selectedFacility.dispensaryData.seniorMedicalOfficer.email}
                </p>
                <p style={{ color: "#888", fontSize: "0.9rem" }}>
                  📱 {selectedFacility.dispensaryData.seniorMedicalOfficer.mobile}
                </p>
              </div>

              {/* Medical Officer */}
              <div
                style={{
                  padding: "2rem",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  border: `2px solid ${selectedFacility.color}20`,
                }}
              >
                <img
                  src={selectedFacility.dispensaryData.medicalOfficer.image}
                  alt={selectedFacility.dispensaryData.medicalOfficer.name}
                  style={{
                    width: "120px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                  }}
                />
                <h3
                  style={{
                    color: selectedFacility.color,
                    marginBottom: "0.5rem",
                  }}
                >
                  {selectedFacility.dispensaryData.medicalOfficer.name}
                </h3>
                <p
                  style={{
                    color: "#666",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Medical Officer
                </p>
                <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                  📧 {selectedFacility.dispensaryData.medicalOfficer.email}
                </p>
                <p style={{ color: "#888", fontSize: "0.9rem" }}>
                  📱 {selectedFacility.dispensaryData.medicalOfficer.mobile}
                </p>
              </div>
            </div>
          </div>

          {/* Visiting Consultants */}
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                color: selectedFacility.color,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Visiting Consultants
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {selectedFacility.dispensaryData.visitingConsultants.map((consultant, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "10px",
                    border: `1px solid ${selectedFacility.color}30`,
                  }}
                >
                  <h3
                    style={{
                      color: selectedFacility.color,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {consultant.name}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {consultant.specialization}
                  </p>
                  {consultant.qualification && (
                    <p
                      style={{
                        color: "#888",
                        fontSize: "0.9rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {consultant.qualification}
                    </p>
                  )}
                  <p
                    style={{
                      color: "#666",
                      fontSize: "0.9rem",
                      backgroundColor: "white",
                      padding: "0.5rem",
                      borderRadius: "5px",
                    }}
                  >
                    🕐 {consultant.schedule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ambulance Services */}
          <div>
            <h2
              style={{
                color: selectedFacility.color,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Ambulance Services
            </h2>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "2rem",
                borderRadius: "10px",
                border: `2px solid ${selectedFacility.color}20`,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h3
                  style={{
                    color: selectedFacility.color,
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Emergency Contact
                </h3>
                <p
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    color: selectedFacility.color,
                  }}
                >
                  📞 {selectedFacility.dispensaryData.ambulance.contact}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "1.5rem",
                    borderRadius: "8px",
                  }}
                >
                  <h4
                    style={{
                      color: selectedFacility.color,
                      marginBottom: "1rem",
                    }}
                  >
                    Operating Hours
                  </h4>
                  <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                    <strong>Availability:</strong> {selectedFacility.dispensaryData.ambulance.timing.availability}
                  </p>
                  <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                    <strong>Morning:</strong> {selectedFacility.dispensaryData.ambulance.timing.morning}
                  </p>
                  <p style={{ color: "#666" }}>
                    <strong>Evening:</strong> {selectedFacility.dispensaryData.ambulance.timing.evening}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    padding: "1.5rem",
                    borderRadius: "8px",
                  }}
                >
                  <h4
                    style={{
                      color: selectedFacility.color,
                      marginBottom: "1rem",
                    }}
                  >
                    Facilities Available
                  </h4>
                  <ul style={{ paddingLeft: "1rem", color: "#666" }}>
                    {selectedFacility.dispensaryData.ambulance.facilities.map((facility, idx) => (
                      <li key={idx} style={{ marginBottom: "0.3rem" }}>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // Main Facilities Page
  return (
    <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            color: "#333",
            fontSize: "2.5rem",
            marginBottom: "1rem",
          }}
        >
          Campus Facilities
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#666",
            lineHeight: "1.8",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Explore the comprehensive range of facilities available at MANIT
          Bhopal, designed to support academic excellence, research innovation,
          and student life.
        </p>
      </div>

      {/* Facilities Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "2rem",
        }}
      >
        {facilitiesData.map((facility) => (
          <div
            key={facility.id}
            onClick={() => handleFacilityClick(facility)}
            style={{
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: `3px solid ${facility.color}20`,
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {facility.icon}
            </div>
            <h3
              style={{
                color: facility.color,
                fontSize: "1.4rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {facility.name}
            </h3>
            <p
              style={{
                color: "#666",
                fontSize: "0.95rem",
                lineHeight: "1.6",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {facility.description}
            </p>
            <div
              style={{
                textAlign: "center",
                color: facility.color,
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              {facility.id === 1 || facility.id === 2 || facility.id === 4
                ? "Click to explore →"
                : selectedFacility?.id === facility.id
                ? "Click to collapse"
                : "Click to expand"}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Facility Details */}
      {selectedFacility &&
        selectedFacility.id !== 1 &&
        selectedFacility.id !== 2 &&
        selectedFacility.id !== 4 && (
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              backgroundColor: `${selectedFacility.color}10`,
              borderRadius: "12px",
              border: `2px solid ${selectedFacility.color}30`,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1rem",
                }}
              >
                {selectedFacility.icon}
              </div>
              <h2
                style={{
                  color: selectedFacility.color,
                  fontSize: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {selectedFacility.name}
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#666",
                  lineHeight: "1.8",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                {selectedFacility.details}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setSelectedFacility(null)}
                style={{
                  backgroundColor: selectedFacility.color,
                  color: "white",
                  border: "none",
                  padding: "0.8rem 2rem",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                Close Details
              </button>
            </div>
          </div>
        )}
    </div>
  );
}