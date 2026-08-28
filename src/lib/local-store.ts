/**
 * Local file-based CRM store.
 * Persists leads and applications to JSON files in /data/.
 * Used automatically when Supabase is not configured.
 * Zero-dependency, zero-setup — works immediately.
 */

import fs from "fs";
import path from "path";
import type { Lead, Application } from "@/lib/crm-types";
import { MOCK_LEADS, MOCK_APPLICATIONS } from "@/lib/mock-data";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const APPS_FILE = path.join(DATA_DIR, "applications.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJSON<T>(filePath: string, defaultData: T[] = []): T[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(filePath)) {
      writeJSON(filePath, defaultData);
      return defaultData;
    }
    const raw = fs.readFileSync(filePath, "utf-8").trim();
    if (!raw) {
      writeJSON(filePath, defaultData);
      return defaultData;
    }
    return JSON.parse(raw) as T[];
  } catch {
    return defaultData;
  }
}

function writeJSON<T>(filePath: string, data: T[]) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ─── LEADS ──────────────────────────────────────────────────────

export function getAllLeads(): Lead[] {
  return readJSON<Lead>(LEADS_FILE, MOCK_LEADS).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getLeadById(id: string): Lead | null {
  return readJSON<Lead>(LEADS_FILE, MOCK_LEADS).find((l) => l.id === id) ?? null;
}

export function insertLead(data: Omit<Lead, "id" | "updated_at">): Lead {
  const leads = readJSON<Lead>(LEADS_FILE, MOCK_LEADS);
  const lead: Lead = {
    ...data,
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    updated_at: data.created_at,
  };
  leads.unshift(lead);
  writeJSON(LEADS_FILE, leads);
  return lead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const leads = readJSON<Lead>(LEADS_FILE, MOCK_LEADS);
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], ...updates, id, updated_at: new Date().toISOString() };
  writeJSON(LEADS_FILE, leads);
  return leads[idx];
}

// ─── APPLICATIONS ────────────────────────────────────────────────

export function getAllApplications(): Application[] {
  return readJSON<Application>(APPS_FILE, MOCK_APPLICATIONS).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getApplicationById(id: string): Application | null {
  return readJSON<Application>(APPS_FILE, MOCK_APPLICATIONS).find((a) => a.id === id) ?? null;
}

export function insertApplication(data: Omit<Application, "id" | "updated_at">): Application {
  const apps = readJSON<Application>(APPS_FILE, MOCK_APPLICATIONS);
  const app: Application = {
    ...data,
    id: `app-local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    updated_at: data.created_at,
  };
  apps.unshift(app);
  writeJSON(APPS_FILE, apps);
  return app;
}

export function updateApplication(id: string, updates: Partial<Application>): Application | null {
  const apps = readJSON<Application>(APPS_FILE, MOCK_APPLICATIONS);
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  apps[idx] = { ...apps[idx], ...updates, id, updated_at: new Date().toISOString() };
  writeJSON(APPS_FILE, apps);
  return apps[idx];
}
