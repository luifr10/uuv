#/bin/bash

set -o pipefail
set -o errexit

NC='\e[39m'
RED='\e[31m'
ORANGE='\e[33m'
GREEN='\e[32m'

log () {
    case "$1" in
        "I")
            str="[INFO] $2"
            ;;
        "W")
            str="$ORANGE[WARN]$NC   $2"
            ;;
        "E")
            str="$RED[ERROR]$NC $2"
            ;;
        "S")
            str="[INFO]$GREEN   $2 $NC"
            ;;
        *)
            str="$RED[ERROR]$NC Bad usage of log function : log <I/W/E/S> <message>"
            ;;
    esac

    echo -e "$str"
}
