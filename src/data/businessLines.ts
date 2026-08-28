export interface BusinessLine {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  foundedYear: number;
  highlightStats: { value: string; label: string }[];
  color: string;
  accentGradient: string;
  heroImage: string;
  services: { title: string; description: string; iconName: string }[];
  scrollyFeatures: {
    step: number;
    title: string;
    description: string;
    visualDetail: string;
  }[];
  ctaText: string;
  inquiryCategory: string;
}

export const BUSINESS_LINES: BusinessLine[] = [
  {
    id: "oil-and-gas",
    name: "Pamtech Oil & Gas",
    slug: "oil-and-gas",
    category: "Downstream Energy & Distribution",
    tagline: "Powering Nigeria's Energy Future with Uncompromising Quality",
    description:
      "Founded in 2016 in Owerri, Pamtech Oil & Gas disrupted the regional downstream petroleum sector through disciplined distribution, calibrated metering, and reliable bulk supply pipelines.",
    foundedYear: 2016,
    highlightStats: [
      { value: "100M+", label: "Liters Fuel Delivered" },
      { value: "#1", label: "Marketer in Imo State" },
      { value: "500+", label: "Commercial Clients" },
      { value: "99.9%", label: "Dispensing Accuracy" },
    ],
    color: "#E7000B",
    accentGradient: "from-[#FB2C36] via-[#E7000B] to-[#FF6900]",
    heroImage: "/images/oil_and_gas_hero.jpg",
    services: [
      {
        title: "Bulk Fuel Distribution",
        description: "Direct-to-site supply of premium PMS, AGO, and DPK with zero contamination guarantees.",
        iconName: "Fuel",
      },
      {
        title: "Fleet Fuel Management",
        description: "Automated fuel cards, real-time telematics, and consumption tracking for corporate fleets.",
        iconName: "Truck",
      },
      {
        title: "Commercial & Industrial Supply",
        description: "Dedicated supply chains powering manufacturing plants, estates, and telecommunication towers.",
        iconName: "Factory",
      },
      {
        title: "Energy Consulting & Logistics",
        description: "Downstream supply chain optimization, storage terminal logistics, and quality assurance.",
        iconName: "TrendingUp",
      },
    ],
    scrollyFeatures: [
      {
        step: 1,
        title: "Terminal Ingestion & Purity Testing",
        description: "Every petroleum batch undergoes rigorous laboratory density and flashpoint testing before loading into our specialized tankers.",
        visualDetail: "Automated lab certification pipeline verifying 100% purity standards.",
      },
      {
        step: 2,
        title: "Real-Time Telematics Fleet Routing",
        description: "Our fleet of calibrated tankers operates with active GPS tracking and electronic valve seals to prevent transit pilferage.",
        visualDetail: "Live GIS tracking connecting regional depots to customer storage points across Nigeria.",
      },
      {
        step: 3,
        title: "Calibrated Dispensing & Zero Downtime",
        description: "From corporate generator banks to industrial storage tanks, we deliver precision metering and scheduled automated refills.",
        visualDetail: "Digital flow-meter audit reports generated instantly upon discharge.",
      },
    ],
    ctaText: "Request Bulk Fuel Quotation",
    inquiryCategory: "Bulk Fuel Supply",
  },
  {
    id: "autoland",
    name: "Pamtech Autoland",
    slug: "autoland",
    category: "Automotive Diagnostics & Care",
    tagline: "Redefining Automotive Excellence Through Precision & Technology",
    description:
      "A complete automotive ecosystem bringing transparency, advanced computerized diagnostics, professional mechanical engineering, and reliable care to vehicle owners across Nigeria.",
    foundedYear: 2021,
    highlightStats: [
      { value: "2", label: "State-of-the-Art Garages" },
      { value: "50,000+", label: "Vehicles Serviced" },
      { value: "150+", label: "Certified Auto Specialists" },
      { value: "98%", label: "First-Time Fix Rate" },
    ],
    color: "#134CA2",
    accentGradient: "from-[#134CA2] via-[#155DFC] to-[#51A2FF]",
    heroImage: "/images/autoland_hero.jpg",
    services: [
      {
        title: "Computerized Diagnostics",
        description: "OEM-level scan tools and oscilloscope analysis for European, American, and Asian vehicles.",
        iconName: "Cpu",
      },
      {
        title: "Comprehensive Engine & Transmission Repair",
        description: "Factory-standard engine rebuilds, gearbox overhauls, and mechatronic calibrations.",
        iconName: "Wrench",
      },
      {
        title: "Suspension, Steering & Braking",
        description: "Digital wheel alignment, shock testing, and hydraulic brake system restoration.",
        iconName: "Settings",
      },
      {
        title: "Spray Booth & Precision Bodywork",
        description: "DeBeer computerized color-matching system and temperature-controlled oven baking.",
        iconName: "Sparkles",
      },
    ],
    scrollyFeatures: [
      {
        step: 1,
        title: "360° Computerized Intake Health Scan",
        description: "Vehicles entering Pamtech Autoland receive a multi-point ECU diagnostic audit and digital inspection report before a single tool is lifted.",
        visualDetail: "Detailed vehicle health scorecard transmitted directly to the owner's phone via Carcare App.",
      },
      {
        step: 2,
        title: "Precision Engineering & OEM Replacement",
        description: "Our certified technicians execute repairs in clean-room bays using genuine OEM parts sourced directly from Pamtech Autoparts.",
        visualDetail: "Laser-calibrated alignment and computerized torque-spec bolt tensioning.",
      },
      {
        step: 3,
        title: "Multi-Tier Quality Audit & Test Drive",
        description: "Every repaired vehicle passes a stringent master-technician road test and digital emissions test before customer handover.",
        visualDetail: "100% verified vehicle readiness certificate and service warranty guarantee.",
      },
    ],
    ctaText: "Book Comprehensive Vehicle Service",
    inquiryCategory: "Autoland Service & Repairs",
  },
  {
    id: "autoparts",
    name: "Pamtech Autoparts",
    slug: "autoparts",
    category: "Genuine OEM Spare Parts",
    tagline: "Supplying 100% Genuine, High-Performance Automotive Components",
    description:
      "Operating the largest genuine spare parts plazas in South-East and South-South Nigeria, Pamtech Autoparts eliminates counterfeit risks with verifiable OEM components.",
    foundedYear: 2021,
    highlightStats: [
      { value: "50,000+", label: "Genuine SKUs in Stock" },
      { value: "2", label: "Regional Mega Plazas" },
      { value: "100%", label: "OEM Verification Guarantee" },
      { value: "1,200+", label: "Wholesale Workshop Partners" },
    ],
    color: "#E7000B",
    accentGradient: "from-[#E7000B] via-[#FF6467] to-[#FFA2A2]",
    heroImage: "/images/autoparts_hero.jpg",
    services: [
      {
        title: "Engine & Mechanical Components",
        description: "Timing belts, pistons, gaskets, water pumps, and OEM spark plugs for all major makes.",
        iconName: "Boxes",
      },
      {
        title: "Braking & Suspension Systems",
        description: "Ceramic brake pads, drilled rotors, control arms, and electronic struts.",
        iconName: "Disc",
      },
      {
        title: "Wholesale Workshop Supply",
        description: "B2B rapid parts dispatch network supporting automotive mechanics and commercial fleets.",
        iconName: "Truck",
      },
      {
        title: "Technical Compatibility Verification",
        description: "VIN-matched parts identification guaranteeing exact fitment and zero return friction.",
        iconName: "CheckCircle",
      },
    ],
    scrollyFeatures: [
      {
        step: 1,
        title: "Direct OEM Sourcing",
        description: "Pamtech imports direct from Tier-1 automotive manufacturers in Germany, Japan, and the USA, bypassing intermediaries.",
        visualDetail: "Blockchain and QR-coded authentication on every sealed parts box.",
      },
      {
        step: 2,
        title: "Automated Plaza Warehouse Logistics",
        description: "Climate-controlled inventory hubs in Owerri and Port Harcourt managing over 50,000 active references.",
        visualDetail: "Barcode-scanned picking systems with under 15-minute dispatch turnaround.",
      },
      {
        step: 3,
        title: "Counterfeit Elimination Guarantee",
        description: "We provide full replacement warranties and technical fitment guidance on every component sold.",
        visualDetail: "Zero-tolerance counterfeit testing ensuring maximum passenger safety.",
      },
    ],
    ctaText: "Inquire for Wholesale / Retail Parts",
    inquiryCategory: "Spare Parts Inquiry",
  },
  {
    id: "luxury-ride",
    name: "Pamtech Luxury Ride",
    slug: "luxury-ride",
    category: "Executive Chauffeur & VIP Mobility",
    tagline: "Redefining Executive Transportation with Unmatched Elegance and Security",
    description:
      "Nigeria's foremost luxury mobility service, boasting an exclusive fleet of armored and premium SUVs, executive coasters, and trained protocol chauffeurs for discerning individuals and corporate leaders.",
    foundedYear: 2022,
    highlightStats: [
      { value: "30+", label: "Premium Luxury SUVs" },
      { value: "10,000+", label: "VIP Trips Completed" },
      { value: "100%", label: "Punctuality & Safety Record" },
      { value: "#1", label: "Executive Rental in South-East" },
    ],
    color: "#FF6900",
    accentGradient: "from-[#FF6900] via-[#FB2C36] to-[#101828]",
    heroImage: "/images/luxury_ride_hero.jpg",
    services: [
      {
        title: "Executive Chauffeur Services",
        description: "Point-to-point transfers in top-tier Lexus LX600, Toyota Land Cruiser 300, and Prado SUVs.",
        iconName: "ShieldCheck",
      },
      {
        title: "State & Corporate Protocol Convoys",
        description: "Multi-vehicle motorcades with trained security drivers and optional pilot vehicle escorts.",
        iconName: "Users",
      },
      {
        title: "VIP Airport Transfers",
        description: "Meet-and-greet tarmac protocol services across major Nigerian international airports.",
        iconName: "Plane",
      },
      {
        title: "Luxury Event & Wedding Fleets",
        description: "Bespoke ceremonial vehicle packages styled to perfection for high-profile occasions.",
        iconName: "Award",
      },
    ],
    scrollyFeatures: [
      {
        step: 1,
        title: "Immaculate Executive Fleet",
        description: "Every vehicle is under 3 years old, detailed daily, and subject to continuous telematics monitoring.",
        visualDetail: "Premium leather interiors, onboard high-speed Wi-Fi, and executive privacy appointments.",
      },
      {
        step: 2,
        title: "Certified Defensive & Protocol Drivers",
        description: "Our chauffeurs undergo intensive tactical defensive driving, anti-kidnap training, and executive etiquette certification.",
        visualDetail: "Background-vetted professionals dedicated to seamless guest discretion.",
      },
      {
        step: 3,
        title: "Bespoke Itinerary & Security Coordination",
        description: "24/7 flight tracking and route risk assessments ensure zero delays and maximum safety for all dignitaries.",
        visualDetail: "Dedicated concierge operations center monitoring trip progress in real time.",
      },
    ],
    ctaText: "Reserve Your Executive Vehicle",
    inquiryCategory: "Luxury Ride Reservation",
  },
  {
    id: "media",
    name: "Pamtech Media",
    slug: "media",
    category: "Broadcasting & Digital Storytelling",
    tagline: "Amplifying Voices, Inspiring Change & Building Cultural Movements",
    description:
      "A dynamic media house connecting brands with millions through high-impact digital content production, corporate documentaries, talent management, and broadcasting excellence.",
    foundedYear: 2023,
    highlightStats: [
      { value: "2B+", label: "Total Views & Impressions" },
      { value: "2.5M+", label: "Engaged Followers" },
      { value: "15+", label: "In-House Digital Creators" },
      { value: "150+", label: "Brand Campaigns Produced" },
    ],
    color: "#155DFC",
    accentGradient: "from-[#155DFC] via-[#51A2FF] to-[#E7000B]",
    heroImage: "/images/media_hero.jpg",
    services: [
      {
        title: "Corporate Documentaries & Video Production",
        description: "Cinematic brand storytelling, commercial advertisements, and executive interviews.",
        iconName: "Video",
      },
      {
        title: "Creator Network & Influencer Marketing",
        description: "High-impact social campaigns powered by top-tier in-house digital talents.",
        iconName: "Radio",
      },
      {
        title: "Broadcasting & Studio Production",
        description: "Ultra-HD multi-camera studio recordings, podcast production, and live event broadcasts.",
        iconName: "Mic",
      },
      {
        title: "Digital Strategy & Media Buying",
        description: "Omnichannel performance marketing and brand positioning across African markets.",
        iconName: "Target",
      },
    ],
    scrollyFeatures: [
      {
        step: 1,
        title: "Cinematic Narrative Architecture",
        description: "From script development to 4K cinematography, we craft stories that resonate emotionally and drive action.",
        visualDetail: "State-of-the-art RED & Sony Cinema camera rigs with color-graded master deliverables.",
      },
      {
        step: 2,
        title: "Viral Distribution & Cultural Reach",
        description: "Leveraging our 2.5M+ organic follower network to achieve viral multi-platform engagement.",
        visualDetail: "Real-time analytics dashboard tracking sentiment, viral coefficients, and conversions.",
      },
      {
        step: 3,
        title: "End-to-End Campaign Execution",
        description: "Delivering turnkey brand impact from initial creative conception to broadcast syndication.",
        visualDetail: "Award-winning creative portfolio driving brand equity for tier-1 enterprises.",
      },
    ],
    ctaText: "Schedule a Media Creative Brief",
    inquiryCategory: "Media & Advertising",
  },
  {
    id: "technology",
    name: "Pamtech Technology",
    slug: "technology",
    category: "Digital Transformation & SaaS",
    tagline: "Engineering Human-Centric Software Products for Everyday Living",
    description:
      "The innovation engine of Pamtech Group, building mission-critical software platforms that digitize vehicle ownership, workshop operations, fueling logistics, and digital vocational education.",
    foundedYear: 2025,
    highlightStats: [
      { value: "4", label: "Flagship Software Platforms" },
      { value: "100k+", label: "Digital Platform Users" },
      { value: "99.99%", label: "Cloud Uptime" },
      { value: "10x", label: "Workshop Operational Speedup" },
    ],
    color: "#51A2FF",
    accentGradient: "from-[#51A2FF] via-[#134CA2] to-[#101828]",
    heroImage: "/images/technology_hero.jpg",
    services: [
      {
        title: "Carcare App",
        description: "Vehicle companion app for booking auto maintenance, viewing digital health logs, and verifying mechanics.",
        iconName: "Smartphone",
      },
      {
        title: "Carcare Garage SaaS",
        description: "Complete workshop management operating system with job cards, inventory sync, and billing.",
        iconName: "Layers",
      },
      {
        title: "Petrol Padi Platform",
        description: "Smart fueling application connecting motorists to verified fuel stations with seamless digital payment.",
        iconName: "Fuel",
      },
      {
        title: "Learn with Pamtech",
        description: "Digital learning and vocational certification platform delivering high-demand technical skills.",
        iconName: "GraduationCap",
      },
    ],
    scrollyFeatures: [
      {
        step: 1,
        title: "Carcare App: The Digital Vehicle Twin",
        description: "Automated service reminders, real-time technician video updates, and immutable maintenance history.",
        visualDetail: "Seamless mobile app experience empowering thousands of motorists across Nigeria.",
      },
      {
        step: 2,
        title: "Carcare Garage: Workshop Automation",
        description: "Empowering independent garages with enterprise-grade scheduling, automated parts ordering, and CRM.",
        visualDetail: "Intuitive cloud dashboard cutting workshop administrative overhead by 60%.",
      },
      {
        step: 3,
        title: "Scalable Cloud Architecture",
        description: "Built on modern cloud infrastructure with bank-grade encryption and ultra-low latency.",
        visualDetail: "Continuous deployment pipeline serving consumer and enterprise users seamlessly.",
      },
    ],
    ctaText: "Explore Products & Request Enterprise Demo",
    inquiryCategory: "Technology & Software Solutions",
  },
  {
    id: "real-estate",
    name: "Pamtech Properties & Real Estate",
    slug: "real-estate",
    category: "Masterplanned Living & Wealth Creation",
    tagline: "A Perfect Place to Call Home. A Smarter Place to Build Wealth.",
    description:
      "Creating landmark sustainable residential estates and smart commercial hubs engineered for generational wealth, security, and world-class luxury living.",
    foundedYear: 2026,
    highlightStats: [
      { value: "150+", label: "Smart Homes Under Construction" },
      { value: "2", label: "Flagship Gated Communities" },
      { value: "100%", label: "Clean Title & C of O" },
      { value: "35%+", label: "Projected Annual Appreciation" },
    ],
    color: "#FB2C36",
    accentGradient: "from-[#FB2C36] via-[#FF6900] to-[#E7000B]",
    heroImage: "/images/real_estate_hero.jpg",
    services: [
      {
        title: "08 City Garden Estate",
        description: "Luxury gated eco-community with biometric access, solar micro-grids, and recreational parks.",
        iconName: "Home",
      },
      {
        title: "Wealth Campus Residences",
        description: "Smart duplexes and executive apartments designed for high-yield rental returns.",
        iconName: "Building",
      },
      {
        title: "Architectural & Construction Services",
        description: "Turnkey structural engineering, contemporary interior fitouts, and smart home automation.",
        iconName: "Compass",
      },
      {
        title: "Real Estate Investment Advisory",
        description: "Strategic land banking, fractional asset ownership, and high-yield property syndication.",
        iconName: "BarChart3",
      },
    ],
    scrollyFeatures: [
      {
        step: 1,
        title: "Strategic Prime Locations",
        description: "Estates situated in rapid-growth corridors with unencumbered titles, government approvals, and rapid capital appreciation.",
        visualDetail: "Interactive masterplan with high-resolution drone site previews.",
      },
      {
        step: 2,
        title: "Smart Eco-Living Infrastructure",
        description: "Underground cabling, fiber-optic connectivity, centralized water treatment, and 24/7 security patrol.",
        visualDetail: "3D architectural floorplans across 2-bedroom classic up to 5-bedroom luxury duplexes.",
      },
      {
        step: 3,
        title: "Flexible Wealth-Building Payment Plans",
        description: "Structured milestone-based payments and guaranteed title handover ensuring transparent investor confidence.",
        visualDetail: "Transparent investor portal with live construction milestone tracking.",
      },
    ],
    ctaText: "Download Estate Brochure & Book Inspection",
    inquiryCategory: "Real Estate Investment",
  },
  {
    id: "foundation",
    name: "Pamtech Foundation",
    slug: "foundation",
    category: "Philanthropy & Community Empowerment",
    tagline: "Committed Service to Humanity Through Sustainable Impact",
    description:
      "The philanthropic arm of Pamtech Group, dedicated to breaking poverty cycles through education scholarships, youth mentorship, enterprise grants, and community healthcare interventions.",
    foundedYear: 2016,
    highlightStats: [
      { value: "1,000+", label: "Direct Scholarship Scholars" },
      { value: "₦50M+", label: "Small Business Grants Awarded" },
      { value: "5,000+", label: "Youths Mentored via DAD" },
      { value: "15+", label: "Rural Communities Uplifted" },
    ],
    color: "#E7000B",
    accentGradient: "from-[#E7000B] via-[#FB2C36] to-[#155DFC]",
    heroImage: "/images/foundation_hero.jpg",
    services: [
      {
        title: "DAD4Adolescents Mentorship",
        description: "Flagship youth leadership initiative providing life skills, moral grounding, and digital career guidance.",
        iconName: "Heart",
      },
      {
        title: "Educational Scholarships",
        description: "Comprehensive tuition and textbook funding for brilliant underprivileged students from primary to tertiary levels.",
        iconName: "BookOpen",
      },
      {
        title: "Micro-Enterprise Grants",
        description: "Direct capital funding and business mentorship for artisanal workers, youth innovators, and female entrepreneurs.",
        iconName: "Gift",
      },
      {
        title: "Community Health & Emergency Outreaches",
        description: "Free medical screenings, medication distribution, and critical community disaster relief.",
        iconName: "Activity",
      },
    ],
    scrollyFeatures: [
      {
        step: 1,
        title: "Grassroots Needs Assessment",
        description: "Our field team conducts verified vulnerability assessments in rural communities to reach those in genuine need.",
        visualDetail: "Transparent beneficiary selection with community elder oversight.",
      },
      {
        step: 2,
        title: "Long-Term Mentorship & Skill Incubation",
        description: "We don't just disburse funds — we pair scholars and grant recipients with executive mentors for sustained growth.",
        visualDetail: "Quarterly progress reviews ensuring 95%+ program completion rates.",
      },
      {
        step: 3,
        title: "Sustainable Generational Impact",
        description: "Empowered individuals go on to employ others and mentor the next generation, creating compounding social transformation.",
        visualDetail: "Documentary impact stories spotlighting transformed families and businesses.",
      },
    ],
    ctaText: "Partner on CSR & Sponsor a Scholar",
    inquiryCategory: "Foundation & CSR Partnership",
  },
];
