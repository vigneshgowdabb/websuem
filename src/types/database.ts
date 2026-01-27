export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
export type ServiceType = "website" | "social" | "automation" | "branding" | "multiple" | "other";
export type LeadSource = "website" | "referral" | "social" | "search" | "other";
export type BookingType = "discovery" | "proposal" | "followup" | "other";
export type BookingStatus = "scheduled" | "completed" | "cancelled" | "no_show";
export type ClientStatus = "active" | "completed" | "inactive";
export type ProjectStatus = "planning" | "in_progress" | "review" | "completed" | "cancelled";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  website?: string;
  phone?: string;
  service_interested?: ServiceType;
  message?: string;
  source?: LeadSource;
  status: LeadStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  lead_id?: string;
  title: string;
  start_time: string;
  end_time: string;
  type?: BookingType;
  status: BookingStatus;
  meeting_link?: string;
  notes?: string;
  created_at: string;
  lead?: Lead;
}

export interface Client {
  id: string;
  lead_id?: string;
  company_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  status: ClientStatus;
  total_revenue: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  projects?: Project[];
}

export interface Project {
  id: string;
  client_id: string;
  name: string;
  service_type?: ServiceType;
  status: ProjectStatus;
  start_date?: string;
  end_date?: string;
  value?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}
