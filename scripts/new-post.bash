#! /usr/bin/env bash
set -e

# This script creates a new post in src/content/blog with the current date and the title provided as an argument.
# If no title is provided, the script will prompt the user for one.

date=$(date +%Y-%m-%d)

if [ -z "$1" ]; then
    read -p "Enter the title of the post: " title
else
    title=$1
fi


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
pushd $DIR/.. > /dev/null
filename="src/content/blog/$date-$(echo $title | tr ' ' '-').md"

echo "Creating new post at $filename"
echo "---
title: \"$title\"
description:
pubDate: $date
tags: []
draft: true
---" > $filename

code "$filename"
popd > /dev/null