#!/bin/bash
cd tests
tsc
cd ..
./node_modules/.bin/mocha --require babel-register tests/tests/*.js 
exit 0