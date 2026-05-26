import { createClient }
from "@supabase/supabase-js";

const supabaseUrl =
  "https://nntdmjodnepsavvlbhvp.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5udGRtam9kbmVwc2F2dmxiaHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MTc0MTQsImV4cCI6MjA5NTM5MzQxNH0.yCC3wz7XQZ-NZf5coEBlG-RBlVXwUeu-UMojtwANP8w";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );