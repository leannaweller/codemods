#!/bin/sh
rm ../test/guinea-pig.js
cp ../test/guinea-pig.example.js guinea-pig.js
jscodeshift -t index.js ../test/guinea-pig.js --file=../test/args.json

