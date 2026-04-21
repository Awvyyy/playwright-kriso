#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 /path/to/your/cloned/playwright-kriso-repo"
  exit 1
fi

TARGET_DIR="$1"
SCRIPT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"

rsync -av --exclude '.git' --exclude 'README_FOR_PR.md' --exclude 'apply_overlay.sh' "$SCRIPT_DIR/" "$TARGET_DIR/"

echo "Overlay applied to: $TARGET_DIR"
