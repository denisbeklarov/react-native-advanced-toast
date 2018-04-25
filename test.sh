#!/bin/bash
cd tests && tsc
cd ..
./node_modules/.bin/jest
exit 0