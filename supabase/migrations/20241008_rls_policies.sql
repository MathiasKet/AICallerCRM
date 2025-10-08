-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" 
ON users FOR SELECT 
USING (auth.uid() = id::uuid);

CREATE POLICY "Users can update their own profile"
ON users FOR UPDATE
USING (auth.uid() = id::uuid);

-- Calls table policies
CREATE POLICY "Users can view their own calls"
ON calls FOR SELECT
USING (auth.uid() = "userId"::uuid);

CREATE POLICY "Users can insert their own calls"
ON calls FOR INSERT
WITH CHECK (auth.uid() = "userId"::uuid);

-- Leads table policies
CREATE POLICY "Users can view their own leads"
ON leads FOR SELECT
USING (auth.uid() = "userId"::uuid);

CREATE POLICY "Users can manage their own leads"
ON leads
FOR ALL
USING (auth.uid() = "userId"::uuid);

-- Contacts table policies
CREATE POLICY "Users can view their own contacts"
ON contacts FOR SELECT
USING (auth.uid() = "userId"::uuid);

CREATE POLICY "Users can manage their own contacts"
ON contacts
FOR ALL
USING (auth.uid() = "userId"::uuid);

-- Scheduled calls policies
CREATE POLICY "Users can view their own scheduled calls"
ON "scheduled_calls" FOR SELECT
USING (auth.uid() = "userId"::uuid);

CREATE POLICY "Users can manage their own scheduled calls"
ON "scheduled_calls"
FOR ALL
USING (auth.uid() = "userId"::uuid);

-- API keys policies
CREATE POLICY "Users can view their own API keys"
ON "api_keys" FOR SELECT
USING (auth.uid() = "userId"::uuid);

CREATE POLICY "Users can manage their own API keys"
ON "api_keys"
FOR ALL
USING (auth.uid() = "userId"::uuid);

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions"
ON subscriptions FOR SELECT
USING (auth.uid() = "userId"::uuid);

-- Allow inserts for new subscriptions (handled by Supabase functions/triggers)
CREATE POLICY "Users can insert subscriptions"
ON subscriptions FOR INSERT
WITH CHECK (true);

-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
