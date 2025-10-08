-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can insert subscriptions" ON subscriptions;

-- Recreate with correct column names
CREATE POLICY "Users can view their own subscriptions" 
ON subscriptions FOR SELECT 
USING (auth.uid() = user_id::uuid);

-- Allow inserts for new subscriptions
CREATE POLICY "Users can insert subscriptions"
ON subscriptions FOR INSERT
WITH CHECK (auth.uid() = user_id::uuid);

-- Update other policies if needed
-- Calls table policies
DROP POLICY IF EXISTS "Users can view their own calls" ON calls;
DROP POLICY IF EXISTS "Users can insert their own calls" ON calls;

CREATE POLICY "Users can view their own calls"
ON calls FOR SELECT
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can insert their own calls"
ON calls FOR INSERT
WITH CHECK (auth.uid() = user_id::uuid);

-- Leads table policies
DROP POLICY IF EXISTS "Users can view their own leads" ON leads;
DROP POLICY IF EXISTS "Users can manage their own leads" ON leads;

CREATE POLICY "Users can view their own leads"
ON leads FOR SELECT
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can manage their own leads"
ON leads
FOR ALL
USING (auth.uid() = user_id::uuid);

-- Contacts table policies
DROP POLICY IF EXISTS "Users can view their own contacts" ON contacts;
DROP POLICY IF EXISTS "Users can manage their own contacts" ON contacts;

CREATE POLICY "Users can view their own contacts"
ON contacts FOR SELECT
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can manage their own contacts"
ON contacts
FOR ALL
USING (auth.uid() = user_id::uuid);

-- Scheduled calls policies
DROP POLICY IF EXISTS "Users can view their own scheduled calls" ON scheduled_calls;
DROP POLICY IF EXISTS "Users can manage their own scheduled calls" ON scheduled_calls;

CREATE POLICY "Users can view their own scheduled calls"
ON scheduled_calls FOR SELECT
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can manage their own scheduled calls"
ON scheduled_calls
FOR ALL
USING (auth.uid() = user_id::uuid);

-- API keys policies
DROP POLICY IF EXISTS "Users can view their own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can manage their own API keys" ON api_keys;

CREATE POLICY "Users can view their own API keys"
ON api_keys FOR SELECT
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can manage their own API keys"
ON api_keys
FOR ALL
USING (auth.uid() = user_id::uuid);

-- Recreate admin function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
