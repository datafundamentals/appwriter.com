#!/bin/bash

# Find all .md files, skipping the node_modules directory
find "$(pwd)" -path "$(pwd)/node_modules" -prune -o -type f -name "*.md" -print | while read -r file; do
  # Check if the first three non-whitespace characters in the file are not '---'
  if ! head -n 1 "$file" | grep -q '^---'; then
    # Get the relative path of the file
    relative_path="${file#$(pwd)/}"
    # Get the filename without the rest of the path and without the .md extension
    filename="$(basename "$file" .md)"
    # Print the relative path and the filename
    echo "$relative_path"
    echo "$filename"
    # Create the new content to prepend
    new_content="---
layout: layout-sidebar
title: $filename
---
"
    # Prepend the new content to the file
    temp_file=$(mktemp)
    echo "$new_content" > "$temp_file"
    cat "$file" >> "$temp_file"
    mv "$temp_file" "$file"
  fi
done
