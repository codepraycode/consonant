CREATE TABLE IF NOT EXISTS public.materials_meta (
    id            uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at    timestamp with time zone DEFAULT now() NOT NULL,
    updated_at    timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
    ----Label is used to index search
    label         TEXT NOT NULL, -- Combination of the following
    -- 
    department    TEXT NOT NULL, --   Just three letters
    code          TEXT NOT NULL, --   Just three digits
    title         TEXT NOT NULL, --   Course title
    source        TEXT,          --   Source of material
    --
    asset_access  TEXT NOT NULL,  --   Link to access the exact file object
    -- asset_path    TEXT REFERENCES storage.objects(name) ON DELETE CASCADE,
    asset_type    TEXT
);
-- Enable row level security
ALTER TABLE public.materials_meta ENABLE ROW LEVEL SECURITY;