_default:
    @just --list

# Create a new blog post (optionally pass a title)
post title="":
    #!/usr/bin/env bash
    set -e
    date=$(date +%Y-%m-%d)
    if [ -z "{{ title }}" ]; then
        read -p "Enter the title of the post: " title
    else
        title="{{ title }}"
    fi
    filename="src/content/blog/$date-$(echo $title | tr ' ' '-').md"
    echo "Creating new post at $filename"
    printf '%s\n' '---' "title: \"$title\"" 'description:' "pubDate: $date" 'tags: []' 'draft: true' '---' > "$filename"
    ${EDITOR:-vim} "$filename"

# List all blog post tags ordered by usage count
tags:
    @find src/content/blog -name '*.md' -print0 \
        | xargs -0 -I{} yq --front-matter=extract '.tags[]' {} \
        | sort \
        | uniq -c \
        | sort -rn \
        | awk '{printf "%3d  %s\n", $1, $2}'

# Run the development server
dev:
    pnpm run dev
