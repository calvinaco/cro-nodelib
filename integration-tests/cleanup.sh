#!/usr/bin/env bash
set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

cd ../

pushd ./
cd chain
./docker/cleanup.sh
popd

# rm -r chain
