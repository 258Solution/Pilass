import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://nhdyrcmwqmuphhqxkrha.supabase.co";

const supabaseKey = "sb_publishable_OFR-nv9zF_0KVWN2n4t88g_WrC4q67s";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);