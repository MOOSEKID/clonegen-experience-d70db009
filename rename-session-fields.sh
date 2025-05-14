#!/bin/bash

# Run replacements across all .ts and .tsx files
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
-e 's/\bmember_id\b/clientId/g' \
-e 's/\bassigned_trainer_id\b/trainerId/g' \
-e 's/\bsession_date\b/date/g' \
-e 's/\bstart_time\b/startTime/g' \
-e 's/\bend_time\b/endTime/g' \
-e 's/\bduration\b/durationMinutes/g' \
-e 's/\bsession_focus_tags\b/focusAreas/g' \
-e 's/\bsession_outcomes\b/achievements/g' \
-e 's/\bsession_type\b/sessionType/g' \
-e 's/\bsession_location\b/location/g' \
-e 's/\bcreated_at\b/createdAt/g' \
-e 's/\bupdated_at\b/updatedAt/g' \
{} +

echo "✅ Rename complete: All fields updated."
