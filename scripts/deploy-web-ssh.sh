#!/usr/bin/env bash
# Remote deploy: pull latest main, rebuild Docker image, restart stack.
# Usage (from your machine, with SSH access to the server):
#   export DEPLOY_HOST=example.com
#   export DEPLOY_USER=deploy
#   export DEPLOY_PATH=/opt/ogchain   # directory containing docker-compose.yml
#   ./scripts/deploy-web-ssh.sh
set -euo pipefail
: "${DEPLOY_HOST:?Set DEPLOY_HOST}"
: "${DEPLOY_USER:?Set DEPLOY_USER}"
: "${DEPLOY_PATH:?Set DEPLOY_PATH}"

ssh -o BatchMode=yes "${DEPLOY_USER}@${DEPLOY_HOST}" bash -s <<EOF
set -euo pipefail
cd "${DEPLOY_PATH}"
git fetch origin main && git checkout main && git pull --ff-only origin main
docker compose build --pull
docker compose up -d
docker compose ps
EOF
