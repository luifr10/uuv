#!/bin/sh

build_uuv_command() {
  local uuv_args=$([[ "$UUV_GENERATE_HTML_REPORT" == true ]] && echo " --generateHtmlReport" || echo "")
  uuv_args=$uuv_args$([[ "$UUV_GENERATE_JUNIT_REPORT" == true ]] && echo " --generateJunitReport" || echo "")
  uuv_args=$uuv_args$([[ "$UUV_GENERATE_A11Y_REPORT" == true ]] && echo " --generateA11yReport" || echo "")
  uuv_args="$uuv_args ${UUV_TARGET_TEST_FILE:=}"
  uuv_args=$uuv_args$([[ -z ${UUV_EXTRA_ARGS} ]] && echo "" || echo " --env=$UUV_EXTRA_ARGS")
  echo "npx uuv e2e$uuv_args"
}
