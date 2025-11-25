#!/bin/bash

# Obsidian to Hugo Converter
# Usage: ./obsidian-import.sh "path/to/obsidian/file.md"

if [ -z "$1" ]; then
    echo "Usage: ./obsidian-import.sh path/to/file.md"
    exit 1
fi

SOURCE_FILE="$1"
FILENAME=$(basename "$SOURCE_FILE" .md)
SLUG=$(echo "$FILENAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
OUTPUT_FILE="content/posts/$SLUG.md"

# Get title from filename
TITLE=$(basename "$SOURCE_FILE" .md)

# Create front matter
cat > "$OUTPUT_FILE" << EOF
---
title: "$TITLE"
date: $(date +%Y-%m-%dT%H:%M:%S%z)
draft: false
categories: ["Security"]
tags: []
---

EOF

# Append content (remove first line if it's just a title)
tail -n +2 "$SOURCE_FILE" >> "$OUTPUT_FILE"

echo "✅ Converted: $OUTPUT_FILE"
echo "📝 Edit categories/tags, then run: hugo server"
