export interface Supplier {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  cover_image_url: string;
  area: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  years_in_business: number;
  rating: number;
  review_count: number;
  price_range: "R" | "RR" | "RRR";
  categories: string[];
  pricing_visible: boolean;
  featured: boolean;
  created_at: string;
  subscription_active?: boolean;
  cover_banner_url?: string;
  bio?: string;
  instagram_url?: string;
  facebook_url?: string;
}

export interface SupplierImage {
  id: string;
  supplier_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
}

export interface PricingItem {
  id: string;
  supplier_id: string;
  item_name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
}

export interface Review {
  id: string;
  supplier_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  event_type: string;
  created_at: string;
}

export interface BookingRequest {
  id: string;
  supplier_id: string;
  reference: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  event_date: string;
  event_type: string;
  guest_count: number;
  venue_location: string;
  equipment_needed: string[];
  notes: string;
  status: "pending" | "quoted" | "confirmed" | "declined";
  created_at: string;
  deal_value?: number | null;
  commission_amount?: number | null;
  commission_status?: "not_applicable" | "pending_invoice" | "invoiced" | "paid";
  admin_notes?: string;
  confirmed_at?: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  supplier_count: number;
}

export const EVENT_TYPES = [
  "Conference",
  "Gala Dinner",
  "Product Launch",
  "Team Building",
  "Year-End Function",
  "Awards Ceremony",
  "Corporate Retreat",
  "Exhibition",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];
