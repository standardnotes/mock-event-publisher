#!/bin/sh
set -e

COMMAND=$1 && shift 1

case "$COMMAND" in
  'start-web' )
    echo "Starting Web..."
    yarn start
    ;;

   * )
    echo "Unknown command"
    ;;
esac

exec "$@"
