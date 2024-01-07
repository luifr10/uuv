#!/bin/bash

set -o pipefail
set -o errexit

source functions.sh
WORKING_DIR='runner-playwright'
RUNNER_DIR='../../../packages/runner-playwright'
NPM_PACKAGE_COMMONS=$(ls ../../dist/packages/uuv-runner-commons-*)
NPM_PACKAGE_A11Y=$(ls ../../dist/packages/uuv-a11y-*)
NPM_PACKAGE_PLAYWRIGHT=$(ls ../../dist/packages/uuv-playwright-*)

log "I" "Cleaning existing directory"
if [ -d "$WORKING_DIR" ]; then rm -Rf $WORKING_DIR; fi

log "I" "Creating directory"
mkdir -p "$WORKING_DIR"
cd "$WORKING_DIR"

log "I" "Creating new npm project"
npm init -y

log "I" "Installing npm dependencies"
npm install -D "../$NPM_PACKAGE_COMMONS" "../$NPM_PACKAGE_A11Y" "../$NPM_PACKAGE_PLAYWRIGHT"

log "I" "Copying test files and dependencies"
cp -R "${RUNNER_DIR}/e2e/" ./uuv
mkdir -p ./uuv/playwright/fixtures
cp -R "${RUNNER_DIR}/playwright/fixtures/" ./uuv/playwright

log "I" "Replace baseUurl"
sed -i 's/http:\/\/localhost:4200/https:\/\/e2e-test-quest.github.io\/simple-webapp\//g' uuv/playwright.config.ts

log "I" "Running e2e test"
if ! npx uuv e2e --generateHtmlReport; then
    log "E" "An error occured during e2e testing"
    exit 1
fi

log "I" "Ended"