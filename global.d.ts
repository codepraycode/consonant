import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient'

declare global {
    var _supabaseInstance: SupabaseClient
    var __alreadySetupStorage: boolean
    var window: Window & typeof globalThis
}

declare var document: Document;