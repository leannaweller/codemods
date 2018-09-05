#!/bin/bash
for f in $(find /INSERT_YOUR_PATH -name '*.js' -or -name '*.jsx')
do 
	jscodeshift -t index.js $f --file=../test/args.json; 
done
