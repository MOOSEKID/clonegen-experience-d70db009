#!/bin/bash

# Load environment variables
source .env.local

# Run the test script
echo "Running user management system tests..."
npx tsx scripts/test-user-management.ts
