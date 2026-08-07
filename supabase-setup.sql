-- PubAgent Hub v2 - Supabase Setup
-- Run this in the Supabase SQL Editor

-- 1. hub_pins table
CREATE TABLE IF NOT EXISTS hub_pins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  pin text NOT NULL,
  type text NOT NULL DEFAULT 'sn' CHECK (type IN ('master', 'sn')),
  sublane text CHECK (sublane IN ('sn-it', 'sn-ops', 'sn-marketing', 'sn-board', NULL)),
  label text NOT NULL,
  hint text DEFAULT '',
  issued_to text NOT NULL,
  issued_date date DEFAULT CURRENT_DATE,
  active boolean DEFAULT true
);

-- 2. hub_apps table
CREATE TABLE IF NOT EXISTS hub_apps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  icon text DEFAULT '🚀',
  color text DEFAULT '#60a5fa',
  category text NOT NULL CHECK (category IN ('sn', 'pubagent', 'bluesky', 'personal')),
  sublane text CHECK (sublane IN ('sn-it', 'sn-ops', 'sn-marketing', 'sn-board', NULL)),
  status text NOT NULL DEFAULT 'planned' CHECK (status IN ('live', 'draft', 'planned')),
  url text DEFAULT '',
  description text DEFAULT '',
  date date DEFAULT CURRENT_DATE,
  archived boolean DEFAULT false
);

-- 3. hub_ideas table
CREATE TABLE IF NOT EXISTS hub_ideas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('sn', 'pubagent', 'bluesky', 'personal')),
  sublane text CHECK (sublane IN ('sn-it', 'sn-ops', 'sn-marketing', 'sn-board', NULL)),
  signal text NOT NULL DEFAULT 'new' CHECK (signal IN ('new', 'considering', 'implemented', 'rejected')),
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- 4. Seed PINs
INSERT INTO hub_pins (pin, type, sublane, label, hint, issued_to, issued_date, active) VALUES
  ('5454', 'master', NULL, 'Master', 'The key to everything', 'Joe Mullane', '2026-01-01', true),
  ('1570', 'sn', 'sn-marketing', 'Marketing', 'First brew', 'Lorraine Hawkins', '2026-01-01', true),
  ('1914', 'sn', 'sn-it', 'IT', 'Ltd registration', 'Paul Owers', '2026-01-01', true),
  ('1864', 'sn', 'sn-ops', 'Ops', 'Percy''s year', 'Ops Team', '2026-01-01', true),
  ('2003', 'sn', 'sn-board', 'Board', 'The CEO', 'JBN', '2026-01-01', true);

-- 5. Seed Apps (migrated from v1)
INSERT INTO hub_apps (name, icon, color, category, sublane, status, url, description, date, archived) VALUES
  ('Tech Pack Presentation', '🎯', '#ff6b6b', 'sn', NULL, 'live', 'https://ng.pubagent.co.uk/present/techpack2', 'Interactive tech pack presentation for client pitches and stakeholder reviews.', '2026-02-15', false),
  ('SMBSMP Dashboard', '📊', '#4ecdc4', 'sn', NULL, 'live', '', 'Social media brand strategy monitoring platform with real-time analytics.', '2026-01-20', false),
  ('NeameGraph Lifecycle Map', '🔄', '#60a5fa', 'sn', NULL, 'live', '', 'Visual lifecycle mapping tool for tracking project stages and dependencies.', '2026-02-01', false),
  ('CSV Brief v3', '📋', '#fbbf24', 'sn', NULL, 'draft', '', 'Third iteration of the CSV brief generator with improved formatting output.', '2026-03-01', false),
  ('mySNpub MVP', '🍺', '#a855f7', 'sn', NULL, 'planned', '', 'Minimum viable product for the mySNpub social networking application.', '2026-03-05', false),
  ('NG Explainer', '🌐', '#ff6b6b', 'pubagent', NULL, 'live', 'https://present-ngexplainer-march2026.pubagent.co.uk', 'Interactive presentation explaining NeameGraph.', '2026-03-07', false),
  ('Review-to-Signal', '📡', '#34d399', 'pubagent', NULL, 'live', 'https://signal.pubagent.co.uk', 'Safe public demo turning simulated review journeys into pub-voice drafts and management signal.', '2026-08-07', false),
  ('Hub Tester', '🧪', '#34d399', 'pubagent', NULL, 'live', 'https://hub-tester.pubagent.co.uk', 'End-to-end deployment pipeline test.', '2026-03-08', false);

-- 6. Enable RLS
ALTER TABLE hub_pins ENABLE ROW LEVEL SECURITY;
ALTER TABLE hub_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE hub_ideas ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies (allow all operations via anon key - PIN auth is app-level)
CREATE POLICY "Allow all access to hub_pins" ON hub_pins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to hub_apps" ON hub_apps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to hub_ideas" ON hub_ideas FOR ALL USING (true) WITH CHECK (true);
