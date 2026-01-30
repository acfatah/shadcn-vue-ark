#!/usr/bin/bash

root=$(pwd)

for dir in "$root/apps"/*; do
  [ -d "$dir" ] || continue
  cd "$dir" || exit 1
  # bun update --peer
  echo "Updating $(pwd)"
  bun install
done
