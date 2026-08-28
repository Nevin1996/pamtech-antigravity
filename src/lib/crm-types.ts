export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "closed";
export type LeadPriority = "low" | "medium" | "high";
export type ApplicationStatus =
  | "received"
  | "reviewing"
  | "shortlisted"
  | "interviewed"
  | "offered"
  | "rejected";

export interface Lead {
  id: string;
  reference_id: string;
  category: string;
  routing_tag: string;
  status: LeadStatus;
  priority: LeadPriority;
  name: string;
  email: string;
  phone: string;
  organization: string | null;
  message: string;
  notes: string | null;
  assigned_to: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  job_title: string;
  department: string;
  location: string;
  status: ApplicationStatus;
  name: string;
  email: string;
  phone: string;
  linkedin_url: string | null;
  pitch: string | null;
  resume_url: string | null;
  resume_filename: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const LEAD_STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; color: string; bgColor: string }
> = {
  new: { label: "New", color: "text-blue-400", bgColor: "bg-blue-500/15 border-blue-500/30" },
  contacted: { label: "Contacted", color: "text-yellow-400", bgColor: "bg-yellow-500/15 border-yellow-500/30" },
  qualified: { label: "Qualified", color: "text-orange-400", bgColor: "bg-orange-500/15 border-orange-500/30" },
  converted: { label: "Converted", color: "text-green-400", bgColor: "bg-green-500/15 border-green-500/30" },
  closed: { label: "Closed", color: "text-gray-400", bgColor: "bg-gray-500/15 border-gray-500/30" },
};

export const APPLICATION_STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string; bgColor: string }
> = {
  received: { label: "Received", color: "text-blue-400", bgColor: "bg-blue-500/15 border-blue-500/30" },
  reviewing: { label: "Reviewing", color: "text-yellow-400", bgColor: "bg-yellow-500/15 border-yellow-500/30" },
  shortlisted: { label: "Shortlisted", color: "text-orange-400", bgColor: "bg-orange-500/15 border-orange-500/30" },
  interviewed: { label: "Interviewed", color: "text-purple-400", bgColor: "bg-purple-500/15 border-purple-500/30" },
  offered: { label: "Offered", color: "text-green-400", bgColor: "bg-green-500/15 border-green-500/30" },
  rejected: { label: "Rejected", color: "text-red-400", bgColor: "bg-red-500/15 border-red-500/30" },
};

export const PRIORITY_CONFIG: Record<
  LeadPriority,
  { label: string; color: string; dot: string }
> = {
  low: { label: "Low", color: "text-gray-400", dot: "bg-gray-400" },
  medium: { label: "Medium", color: "text-yellow-400", dot: "bg-yellow-400" },
  high: { label: "High", color: "text-red-400", dot: "bg-red-400" },
};

export const DIVISION_TAGS: Record<string, string> = {
  bulk_fuel_supply: "Oil & Gas",
  autoland_service___fleet_repairs: "Autoland",
  autoland_service___fleet_contract: "Autoland",
  genuine_spare_parts_wholesale: "Autoparts",
  luxury_ride___vip_chauffeur_booking: "Luxury Ride",
  media___creative_advertising: "Media",
  technology___software_solutions: "Technology",
  real_estate___property_investment: "Real Estate",
  foundation___csr_partnership: "Foundation",
  general_corporate_inquiries: "General",
  general_inquiry: "General",
};
