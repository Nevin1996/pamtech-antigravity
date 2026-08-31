export interface TimelineMilestone {
  year: number | string;
  title: string;
  badge: string;
  color: string;
  badgeBg: string;
  icon: string;
  summary: string;
  highlights: string[];
  businessSlug?: string;
  image: string;
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: 2016,
    title: "The Beginning",
    badge: "Laying the foundation for the bliss ahead",
    color: "#E7000B",
    badgeBg: "bg-red-50 text-red-700 border-red-200",
    icon: "Rocket",
    summary:
      "Pamtech Oil and Gas began in 2016 after identifying a critical gap in Nigeria’s downstream sector. Rather than compete at the top of the value chain, Pamtech entered through disciplined trading, calibrated distribution, and absolute integrity.",
    highlights: [
      "Founded in Owerri, Imo State",
      "Started with a dedicated team of 3",
      "Grew to become the biggest oil and gas marketer in Imo State",
    ],
    businessSlug: "oil-and-gas",
    image: "/assets/pictures/oil_and_gas.png",
  },
  {
    year: 2021,
    title: "The Birth of Autoland",
    badge: "Redefining Automotive Excellence",
    color: "#134CA2",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "Wrench",
    summary:
      "For Pamtech Autoland, the vision was clear: build a platform and physical operation that brings transparency, proper vehicle history tracking, professional diagnostics, and reliable service delivery into one coordinated ecosystem.",
    highlights: [
      "2 state-of-the-art diagnostic mega-garages in Owerri and Port Harcourt",
      "Biggest genuine spare parts plazas in 2 geopolitical regions",
      "South-South / South-East market dominance",
      "Over 150+ specialized automotive personnel employed",
    ],
    businessSlug: "autoland",
    image: "/assets/pictures/auto_land.png",
  },
  {
    year: 2022,
    title: "Luxury Transportation",
    badge: "Pioneering comfort, class and security",
    color: "#FF6900",
    badgeBg: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "Car",
    summary:
      "Pamtech Luxury Ride redefines elegance and executive mobility with an exclusive fleet of premium SUVs and executive coaches, tailored for both high-net-worth individuals and corporate multinational logistics.",
    highlights: [
      "Fleet of 30+ premium SUVs (Lexus LX600, Land Cruiser 300, Prado)",
      "Executive luxury coaster buses for corporate delegations",
      "Unchallenged #1 executive car rental company in South-East Nigeria",
      "Trained tactical protocol and security-trained chauffeurs",
    ],
    businessSlug: "luxury-ride",
    image: "/assets/pictures/luxury_ride.png",
  },
  {
    year: 2023,
    title: "Media & Communications",
    badge: "Amplifying voices, inspiring change",
    color: "#155DFC",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: "Radio",
    summary:
      "Leveraging creative content, cinematic storytelling, and digital production into building a powerful cultural community for business growth and consumer connection.",
    highlights: [
      "Over 2 Billion people reached across digital campaigns",
      "Over 2.5 Million combined engaged digital followership",
      "15+ top in-house content creators and digital influencers",
      "High-end corporate documentary and broadcast studio capabilities",
    ],
    businessSlug: "media",
    image: "/assets/pictures/pamtech_media.jpg",
  },
  {
    year: 2025,
    title: "Digital Innovation",
    badge: "Pioneering human-centric software solutions",
    color: "#51A2FF",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
    icon: "Cpu",
    summary:
      "Becoming Africa’s most innovative and people-centred technology company, known for creating software products that improve how people live, maintain vehicles, and do business.",
    highlights: [
      "Carcare App: Digital vehicle maintenance and verified booking platform",
      "Carcare Garage: Enterprise workshop management SaaS system",
      "Petrol Padi: Smart digital on-demand fueling and payment network",
      "Learn with Pamtech: Technical skill acquisition & certification portal",
    ],
    businessSlug: "technology",
    image: "/assets/pictures/pamtech_tech.jpg",
  },
  {
    year: 2026,
    title: "Building Legacies",
    badge: "Creating sustainable futures and smart wealth",
    color: "#FB2C36",
    badgeBg: "bg-red-50 text-red-700 border-red-200",
    icon: "Building",
    summary:
      "Pamtech Properties & Real Estate launched — a perfect place to call home, and a smarter place to build generational wealth with clean title security and world-class infrastructure.",
    highlights: [
      "08 City Garden: Flagship eco-friendly gated community",
      "Wealth Campus: High-yield residential and commercial living",
      "150+ smart luxury homes under construction",
      "100% verified Certificate of Occupancy (C of O) guarantees",
    ],
    businessSlug: "real-estate",
    image: "/assets/pictures/real_estate.png",
  },
  {
    year: "Ongoing",
    title: "Holistic Social Impact",
    badge: "Committed Service to Humanity",
    color: "#E7000B",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    icon: "Heart",
    summary:
      "Pamtech Foundation is transforming grassroots communities across Nigeria through education scholarships, youth leadership mentorship, healthcare outreaches, and business incubation grants.",
    highlights: [
      "DAD4Adolescents: Mentoring thousands of young Nigerians",
      "1,000+ direct scholarship and educational grant beneficiaries",
      "Substantial non-repayable capital grants awarded to artisanal micro-businesses",
      "Sustainable community development in rural and peri-urban hubs",
    ],
    businessSlug: "foundation",
    image: "/assets/pictures/foundation-gallery.png",
  },
];
