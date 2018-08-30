#!/bin/sh
rm guinea-pig.js
cp guinea-pig.example.js guinea-pig.js
jscodeshift -t index.js guinea-pig.js --file=./args.json

