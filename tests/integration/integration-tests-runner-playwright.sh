#!/bin/bash

set -o pipefail
set -o errexit

source functions.sh
WORKING_DIR='runner-playwright'
RUNNER_DIR='../../../packages/runner-playwright'
NPM_PACKAGE_COMMONS=$(ls ../../dist/packages/uuv-runner-commons-*)
NPM_PACKAGE_PLAYWRIGHT=$(ls ../../dist/packages/uuv-playwright-*)

log "I" "Cleaning existing directory"
if [ -d "$WORKING_DIR" ]; then rm -Rf $WORKING_DIR; fi

log "I" "Creating directory"
mkdir -p "$WORKING_DIR"
cd "$WORKING_DIR"

log "I" "Creating new npm project"
npm init -y

log "I" "Installing npm dependencies"
npm install -D http-server "../$NPM_PACKAGE_COMMONS" "../$NPM_PACKAGE_PLAYWRIGHT"

log "I" "Copying test files and dependencies"
cp -R "${RUNNER_DIR}/e2e/" ./uuv
mkdir -p ./uuv/playwright/fixtures
cp -R "${RUNNER_DIR}/playwright/fixtures/" ./uuv/playwright

log "I" "Running http server"
http-server ../../../packages/runner-playwright/ -p 4200 -s &

log "I" "Running e2e test"
if ! npx uuv e2e; then
    log "E" "An error occured during e2e testing"
fi

log "I" "Closing http server"
 pkill -f http-server

log "I" "Ended"