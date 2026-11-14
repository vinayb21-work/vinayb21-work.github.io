#!/bin/bash

UPLOAD_DIRS=(public/uploads/photos public/uploads/treks public/uploads/sketching)

# Step 1: Convert HEIC files to JPG (if any exist)
find "${UPLOAD_DIRS[@]}" -type f -iname "*.HEIC" -exec sh -c '
  for f; do
    sips -s format jpeg "$f" --out "${f%.*}.jpg"
    rm "$f"
  done
' _ {} +

# Step 2: Resize images wider than 1600px (skip already-smaller files)
find "${UPLOAD_DIRS[@]}" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | while IFS= read -r -d '' f; do
  width=$(sips -g pixelWidth "$f" 2>/dev/null | awk '/pixelWidth/ {print $2}')
  if [ -n "$width" ] && [ "$width" -gt 1600 ]; then
    sips --resampleWidth 1600 "$f" >/dev/null
  fi
done

echo "Image cleanup complete!"
