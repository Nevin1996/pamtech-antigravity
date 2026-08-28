-- ============================================================
-- PAMTECH GROUP CRM — SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── STATUS ENUMS ────────────────────────────────────────────
CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'qualified',
  'converted',
  'closed'
);

CREATE TYPE lead_priority AS ENUM (
  'low',
  'medium',
  'high'
);

CREATE TYPE application_status AS ENUM (
  'received',
  'reviewing',
  'shortlisted',
  'interviewed',
  'offered',
  'rejected'
);

-- ─── LEADS TABLE ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id     TEXT NOT NULL UNIQUE,
  category         TEXT NOT NULL,
  routing_tag      TEXT NOT NULL,
  status           lead_status NOT NULL DEFAULT 'new',
  priority         lead_priority NOT NULL DEFAULT 'medium',
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT NOT NULL,
  organization     TEXT,
  message          TEXT NOT NULL,
  notes            TEXT,
  assigned_to      TEXT,
  source           TEXT DEFAULT 'website',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── APPLICATIONS TABLE ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id           TEXT NOT NULL,
  job_title        TEXT NOT NULL,
  department       TEXT NOT NULL,
  location         TEXT NOT NULL,
  status           application_status NOT NULL DEFAULT 'received',
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT NOT NULL,
  linkedin_url     TEXT,
  pitch            TEXT,
  resume_url       TEXT,
  resume_filename  TEXT,
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────
-- Enable RLS (data protected by default)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Service role (used in API routes) can do everything
CREATE POLICY "Service role full access on leads"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on applications"
  ON applications FOR ALL
  USING (auth.role() = 'service_role');

-- Authenticated CRM users can read and update
CREATE POLICY "Authenticated users can view leads"
  ON leads FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update leads"
  ON leads FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view applications"
  ON applications FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update applications"
  ON applications FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ─── STORAGE BUCKET FOR RESUMES ──────────────────────────────
-- Run in Storage section or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- ─── SEED DATA (optional demo) ───────────────────────────────
INSERT INTO leads (reference_id, category, routing_tag, status, priority, name, email, phone, organization, message, source)
VALUES
  ('PAM-000001', 'Bulk Fuel Supply (Oil & Gas)', 'bulk_fuel_supply', 'new', 'high', 'Chief Emeka Okafor', 'emeka.okafor@oilco.ng', '+234 803 000 1111', 'Oilco Nigeria Ltd', 'We require 50,000 liters of AGO delivered weekly to our Enugu plant. Please send pricing and SLA.', 'contact_page'),
  ('PAM-000002', 'Autoland Service & Fleet Repairs', 'autoland_service', 'contacted', 'medium', 'Mrs Ngozi Adeyemi', 'ngozi.adeyemi@gmail.com', '+234 805 200 3344', NULL, 'I have a Toyota Prado that needs full suspension overhaul and ECU diagnostics. How soon can I schedule?', 'business_line_cta'),
  ('PAM-000003', 'Real Estate & Property Investment', 'real_estate_investment', 'qualified', 'high', 'Dr. Chibuike Nwosu', 'cnwosu@nwosufamily.com', '+234 808 456 7890', 'Nwosu Family Office', 'Interested in purchasing 2 units at 08 City Garden as rental investment. Would like to discuss payment plan.', 'business_line_cta'),
  ('PAM-000004', 'Luxury Ride & VIP Chauffeur Booking', 'luxury_ride_reservation', 'new', 'medium', 'Alhaji Musa Garba', 'agarba@statelodge.gov.ng', '+234 802 111 2233', 'Imo State Lodge', 'We need a 5-vehicle executive convoy for a 3-day state function next month. Please quote full package.', 'inquiry_modal'),
  ('PAM-000005', 'Media & Creative Advertising', 'media___advertising', 'new', 'low', 'Tolu Bankole', 'tolu@brandcraft.com.ng', '+234 901 333 5566', 'BrandCraft Agency', 'Looking to produce a 4-minute corporate documentary for our annual report. Do you handle full production?', 'contact_page');
