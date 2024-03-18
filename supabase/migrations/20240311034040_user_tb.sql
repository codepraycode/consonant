/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
CREATE TABLE IF NOT EXISTS public.users (
  -- UUID from auth.users
  id            uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  username      TEXT,
  avatar_url    TEXT,
  -- The customer's billing address, stored in JSON format.
  matric_no     TEXT,
  -- Stores your user's last computer(last used to authenticate).
  agent_info    jsonb
);

alter table public.users enable row level security;
create policy "Can view own user data." on users for select using (auth.uid() = id);
create policy "Can update own user data." on users for update using (auth.uid() = id);


/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER as $$
BEGIN
  INSERT INTO public.users (id, username, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY definer;


CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE auth.users ENABLE TRIGGER on_auth_user_created;

-- ===============================================================


-- Relate Material meta to user
ALTER TABLE public.materials_meta
ADD COLUMN user_id uuid REFERENCES public.users(id) ON DELETE CASCADE;
-- make asset_type    not null
