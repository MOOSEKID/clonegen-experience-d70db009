#!/bin/bash

# Set Supabase service role key
export SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZG5xdW5xZWlidm9jeHNia2hiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTkwODE2OCwiZXhwIjoxODU3NDg0MTY4fQ.q4yP7fQWPRC2MEE3j5LTFfPCCeFFRridDnn_II6Us0I"

# Run the test script
echo "Running user management system tests..."
npx tsx scripts/test-user-management.ts
