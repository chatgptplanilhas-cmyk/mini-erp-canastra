import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xfanhedolsznsfpgvlms.supabase.co'

const supabaseKey =
  'sb_publishable_CeYmpsOkuZ59hT077NOlBg__wKXwoNc'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)