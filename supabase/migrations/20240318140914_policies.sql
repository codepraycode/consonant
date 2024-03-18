
-- Enable read access to all users
CREATE POLICY "Enable read access for all users" ON "public"."materials_meta"
AS PERMISSIVE FOR SELECT
TO public
USING (true);


-- Enable insert for only anon users
CREATE POLICY "Enable insert for authenticated users only" ON "public"."materials_meta"
AS PERMISSIVE FOR INSERT
TO anon

WITH CHECK (true);


-- Enable read for everyone on object
CREATE POLICY "Enable read access for all users" ON storage.objects
AS PERMISSIVE FOR SELECT
TO public
USING (true);


-- Enable update for anon people
CREATE POLICY "Enable update for users based on email" ON storage.objects
AS PERMISSIVE FOR UPDATE
TO anon, service_role
USING (true)
WITH CHECK (true);

-- Enable insert for authenticated and anon users
CREATE POLICY "Enable insert for authenticated users only" ON storage.objects
AS PERMISSIVE FOR INSERT
TO anon, service_role

WITH CHECK (true);