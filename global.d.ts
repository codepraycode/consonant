import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient'

declare global {
    var _superbaseInstance: SuperbaseClient
    var __alreadySetupStorage: boolean
    var window: Window & typeof globalThis
}
