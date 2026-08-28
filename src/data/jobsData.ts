export interface JobOpening {
  id: string;
  title: string;
  department: string;
  divisionSlug: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Hybrid" | "Remote";
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "auto-lead-tech",
    title: "Lead Master Automotive Diagnostic Technician",
    department: "Automotive Engineering",
    divisionSlug: "autoland",
    location: "Owerri, Imo State",
    type: "Full-Time",
    experience: "5+ Years",
    description:
      "We are seeking an experienced Master Diagnostic Technician to spearhead advanced computerized troubleshooting, ECU re-flashing, and complex mechanical overhauls at our flagship Owerri mega-garage.",
    requirements: [
      "Degree or HND in Mechanical/Automotive Engineering or equivalent certification.",
      "Demonstrated mastery of Autel, Launch, and OEM diagnostic interfaces.",
      "Proven track record working with modern European and Japanese luxury drivetrains.",
      "Strong leadership skills with ability to mentor junior apprentice technicians.",
    ],
    responsibilities: [
      "Conduct complex vehicle health audits and electrical diagnostics.",
      "Supervise mechanical bay workflows and enforce strict QA test protocols.",
      "Liaise with workshop advisors to provide transparent diagnostic reports.",
    ],
  },
  {
    id: "sr-frontend-eng",
    title: "Senior Full-Stack Software Engineer (React / Next.js)",
    department: "Technology & Product",
    divisionSlug: "technology",
    location: "Hybrid / Port Harcourt",
    type: "Full-Time",
    experience: "4+ Years",
    description:
      "Join the Pamtech Technology core team building Carcare App, Carcare Garage SaaS, and Petrol Padi. You will architect high-performance, responsive web and mobile interfaces serving hundreds of thousands of users.",
    requirements: [
      "Deep proficiency with TypeScript, Next.js (App Router), React Native, and Tailwind CSS.",
      "Experience integrating REST / GraphQL APIs and real-time WebSockets.",
      "Strong grasp of UI/UX fidelity, micro-interactions, and accessibility standards.",
      "Prior SaaS or automotive-tech product experience is an added advantage.",
    ],
    responsibilities: [
      "Lead frontend architecture across customer and workshop SaaS portals.",
      "Collaborate with product designers and backend engineers to deploy robust features.",
      "Optimize core web vitals, bundle sizes, and mobile rendering performance.",
    ],
  },
  {
    id: "estate-sales-exec",
    title: "Senior Real Estate Investment Advisor",
    department: "Properties & Real Estate",
    divisionSlug: "real-estate",
    location: "Owerri, Imo State",
    type: "Full-Time",
    experience: "3+ Years",
    description:
      "Drive high-value residential and commercial property sales for Pamtech's flagship 08 City Garden and Wealth Campus developments. You will engage high-net-worth investors and corporate clients.",
    requirements: [
      "Bachelor's degree in Estate Management, Marketing, or Business Administration.",
      "Proven track record of closing off-plan residential and luxury estate transactions.",
      "Strong professional network of HNIs, diaspora investors, and corporate buyers.",
      "Exceptional negotiation, presentation, and relationship management skills.",
    ],
    responsibilities: [
      "Manage prospective client portfolios from inquiry to final deed handover.",
      "Conduct site inspections and present financial ROI projections to buyers.",
      "Coordinate with legal and customer operations teams for seamless documentation.",
    ],
  },
  {
    id: "downstream-ops-mgr",
    title: "Downstream Petroleum Logistics Coordinator",
    department: "Energy & Supply Chain",
    divisionSlug: "oil-and-gas",
    location: "Port Harcourt, Rivers State",
    type: "Full-Time",
    experience: "4+ Years",
    description:
      "Supervise bulk fuel dispatch, tanker telematics tracking, and terminal loading operations for Pamtech Oil & Gas across South-East and South-South supply corridors.",
    requirements: [
      "B.Sc in Logistics, Supply Chain Management, or Petroleum Engineering.",
      "Familiarity with DPR/NMDPRA compliance, depot safety protocols, and calibrated metering.",
      "Experience managing large-scale commercial fuel distribution fleets.",
      "Exceptional crisis management and schedule adherence under tight deadlines.",
    ],
    responsibilities: [
      "Coordinate daily tanker loading schedules and route dispatch.",
      "Monitor automated telematics to prevent transit loss and optimize fuel delivery times.",
      "Enforce zero-contamination quality standards across all tanker fleets.",
    ],
  },
  {
    id: "video-creative-lead",
    title: "Senior Video Producer & Motion Designer",
    department: "Pamtech Media",
    divisionSlug: "media",
    location: "Owerri / Lagos",
    type: "Full-Time",
    experience: "3+ Years",
    description:
      "Lead creative video production, documentary storytelling, and viral social content for Pamtech Media's diverse brand roster and external corporate clients.",
    requirements: [
      "Expertise with Adobe Premiere Pro, After Effects, DaVinci Resolve, and cinema cameras.",
      "Strong portfolio demonstrating corporate documentaries, commercials, or viral reels.",
      "Solid understanding of social media algorithms, pacing, and visual storytelling.",
    ],
    responsibilities: [
      "Direct, shoot, and edit high-impact brand documentaries and digital ads.",
      "Collaborate with scriptwriters and in-house influencers on viral campaigns.",
      "Ensure consistent cinematic color grading and audio mastering across all releases.",
    ],
  },
];
