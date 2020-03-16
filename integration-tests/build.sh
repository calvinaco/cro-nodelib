#!/usr/bin/env bash
set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

cd ../
# git -C chain pull || git clone https://github.com/crypto-com/chain

pushd ./
cd chain
./docker/build.sh
popd
