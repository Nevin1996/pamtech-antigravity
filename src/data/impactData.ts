export interface ImpactMetric {
  numericValue: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    numericValue: 100000,
    suffix: "+",
    label: "Customers Served",
    description: "Across retail auto service, fueling networks, real estate, and digital software products.",
  },
  {
    numericValue: 50000,
    suffix: "+",
    label: "Vehicles Maintained",
    description: "Expertly serviced with 98% first-time fix accuracy in our state-of-the-art garages.",
  },
  {
    numericValue: 100,
    suffix: "M+",
    label: "Liters Fuel Delivered",
    description: "Distributed with 100% purity and calibrated precision to industries and households.",
  },
  {
    numericValue: 10000,
    suffix: "+",
    label: "Lives Impacted",
    description: "Directly empowered through Pamtech Foundation scholarships, grants, and mentorship.",
  },
  {
    numericValue: 10,
    suffix: "+",
    label: "Years of Excellence",
    description: "A decade of intentional, principled growth from 2016 to 2026.",
  },
  {
    numericValue: 8,
    suffix: "",
    label: "Business Lines",
    description: "Synergistic subsidiaries transforming Nigeria's core commercial landscape.",
  },
];

export interface ImpactGalleryItem {
  id: string;
  title: string;
  category: "Foundation" | "Technology" | "Real Estate" | "Energy & Automotive";
  description: string;
  year: string;
  image: string;
}

export const IMPACT_GALLERY: ImpactGalleryItem[] = [
  {
    id: "dad-mentorship",
    title: "DAD4Adolescents Leadership Summit",
    category: "Foundation",
    description: "Annual youth empowerment conference mentoring over 1,500 adolescents on digital skills, character development, and academic excellence.",
    year: "2025",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "autoland-garage-tour",
    title: "Owerri Diagnostic Mega-Garage Hub",
    category: "Energy & Automotive",
    description: "State-of-the-art computerized diagnostic floor servicing over 150 fleet vehicles weekly with zero turn-away rate.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "scholarship-awards",
    title: "Pamtech Future Leaders Scholarship Grant",
    category: "Foundation",
    description: "Awarding 100% tuition scholarships and academic stipends to underprivileged science & engineering scholars.",
    year: "2025",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "estate-groundbreaking",
    title: "08 City Garden Eco-Estate Development",
    category: "Real Estate",
    description: "Groundbreaking and smart infrastructure installation for 150+ contemporary eco-luxury residences.",
    year: "2026",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "carcare-launch",
    title: "Carcare App & Garage SaaS Launch",
    category: "Technology",
    description: "Unveiling Nigeria's pioneering digital auto companion app, connecting motorists directly with verified technicians.",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "micro-grant-awards",
    title: "Artisanal Women & Youth Business Grants",
    category: "Foundation",
    description: "Disbursing non-repayable capital seed grants to 75 local female entrepreneurs and auto-mechanic apprentices.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop",
  },
];
