ALTER TABLE "public"."materials_meta"
DROP COLUMN IF EXISTS "asset_id";

ALTER TABLE "public"."materials_meta"
ADD COLUMN "asset_path" TEXT;

-- Update existing rows to populate the new column
UPDATE "public"."materials_meta"
SET "asset_path" = 'NULL'; -- Set a default value or use appropriate logic to populate the column

ALTER TABLE "public"."materials_meta"
ALTER COLUMN "asset_path" SET NOT NULL;
